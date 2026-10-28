import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const toolRoot = resolve(here, "..");
const previewFile = resolve(toolRoot, "index-preview.html");
const productionFile = resolve(toolRoot, "index.html");
const modes = [
  { id: "set", goal: "Belajar pecahan kumpulan", key: "goal-set" },
  { id: "pizza", goal: "Belajar pecahan piza", key: "goal-pizza" },
  { id: "equivalent", goal: "Belajar pecahan setara", key: "goal-equivalent" },
  { id: "mixed", goal: "Belajar nombor bercampur", key: "goal-mixed" },
  { id: "hundred", goal: "Belajar grid seratus", key: "goal-hundred" }
];
const guideKeys = [
  "goal-set", "set-read", "set-groups", "set-select", "set-check",
  "goal-pizza", "pizza-read", "pizza-equal", "pizza-choose", "pizza-check",
  "goal-equivalent", "equivalent-read", "equivalent-reference", "equivalent-shade", "equivalent-check",
  "goal-mixed", "mixed-read", "mixed-whole", "mixed-remainder", "mixed-check",
  "goal-hundred", "hundred-read", "hundred-grid", "hundred-adjust", "hundred-check"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const productionHtml = readFileSync(productionFile, "utf8");
const previewHtml = readFileSync(previewFile, "utf8");
assert(productionHtml.includes('type="module" src="auth-bootstrap.js"'), "Production entry does not load authorization.");
assert(!productionHtml.includes('<script src="app.js"'), "Production entry bypasses authorization.");
assert(previewHtml.includes('src="shared-components-loader.js"') && previewHtml.includes('src="app.js"'), "Preview does not load the app directly.");
assert(!previewHtml.includes('id="authGate"'), "Preview unexpectedly contains the authorization gate.");
assert(!productionHtml.includes("forest-footer") && !previewHtml.includes("forest-footer"), "Legacy forest footer is still mounted.");
assert(!productionHtml.includes("control-panel") && !productionHtml.includes("learning-strip"), "Legacy side instructions are still mounted.");

for (const mode of modes) {
  const path = resolve(toolRoot, "assets", "activity-icons", `${mode.id}.png`);
  assert(existsSync(path) && statSync(path).size > 2048, `Missing activity icon: ${mode.id}.png`);
  const probe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=codec_name,width,height,pix_fmt", "-of", "json", path], { encoding: "utf8", windowsHide: true });
  const stream = probe.status === 0 ? JSON.parse(probe.stdout).streams?.[0] : null;
  assert(stream?.codec_name === "png" && stream.width === 256 && stream.height === 256 && stream.pix_fmt === "rgba", `Invalid icon: ${mode.id}.png`);
}

for (const language of ["bm", "zh", "en"]) {
  for (const key of guideKeys) {
    const path = resolve(toolRoot, "assets", "operation-guide", "voices", language, "contextual", `${key}.mp3`);
    assert(existsSync(path) && statSync(path).size > 1024, `Missing narration: ${language}/${key}.mp3`);
    const probe = spawnSync("ffprobe", ["-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_name", "-of", "default=noprint_wrappers=1:nokey=1", path], { encoding: "utf8", windowsHide: true });
    assert(probe.status === 0 && probe.stdout.trim() === "mp3", `Invalid narration: ${language}/${key}.mp3`);
  }
}

const chromeCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium"
];
const chromePath = chromeCandidates.find(existsSync);
if (!chromePath) throw new Error("Chrome or Edge was not found.");

const port = 9720 + Math.floor(Math.random() * 200);
const profile = mkdtempSync(join(tmpdir(), "edcloud-fraction-smoke-"));
const browser = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--allow-file-access-from-files",
  "--autoplay-policy=no-user-gesture-required",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--window-size=1600,1000",
  pathToFileURL(previewFile).href
], { stdio: "ignore", windowsHide: true });

const delay = milliseconds => new Promise(resolveDelay => setTimeout(resolveDelay, milliseconds));

async function waitForEndpoint() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const pages = await fetch(`http://127.0.0.1:${port}/json`).then(response => response.json());
      const page = pages.find(candidate => candidate.type === "page" && candidate.url.startsWith("file:"));
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch (_) {
      // Browser is starting.
    }
    await delay(100);
  }
  throw new Error("Chrome DevTools endpoint did not become ready.");
}

const socket = new WebSocket(await waitForEndpoint());
await new Promise((resolveOpen, rejectOpen) => {
  socket.addEventListener("open", resolveOpen, { once: true });
  socket.addEventListener("error", rejectOpen, { once: true });
});

let nextId = 1;
const pending = new Map();
const browserErrors = [];
socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const pendingCall = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) pendingCall.reject(new Error(message.error.message));
    else pendingCall.resolve(message.result);
    return;
  }
  if (message.method === "Runtime.exceptionThrown") browserErrors.push(message.params.exceptionDetails?.text || "Runtime exception");
  if (message.method === "Log.entryAdded" && message.params.entry.level === "error") browserErrors.push(message.params.entry.text);
});

function call(method, params = {}) {
  const id = nextId++;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolveCall, rejectCall) => pending.set(id, { resolve: resolveCall, reject: rejectCall }));
}

async function evaluate(expression) {
  const result = await call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Evaluation failed");
  return result.result.value;
}

async function waitFor(expression, message, timeout = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(expression)) return;
    await delay(100);
  }
  throw new Error(message);
}

try {
  await call("Runtime.enable");
  await call("Page.enable");
  await call("Log.enable");
  await waitFor(
    `Boolean(document.querySelector('#conceptStage')?.children.length && document.querySelector('edcloud-operation-guide')?.shadowRoot?.querySelector('.guide-root[data-ready="true"]'))`,
    "Fraction tool or shared guide did not initialize."
  );

  const desktop = await evaluate(`(() => {
    const font = selector => Number.parseFloat(getComputedStyle(document.querySelector(selector)).fontSize);
    const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
    return {
      modes: [...document.querySelectorAll('[data-mode]')].map(button => button.dataset.mode),
      brandTitle: font('.brand h1'),
      brandSubtitle: font('.brand p'),
      modeFont: font('.mode-tab'),
      promptFont: font('.prompt-row h2'),
      challengeFont: font('.challenge-value'),
      feedbackFont: font('.feedback'),
      panel: rect('.visual-panel'),
      shell: rect('.page-shell'),
      icons: [...document.querySelectorAll('.mode-icon')].map(icon => icon.complete && icon.naturalWidth === 256),
      sidePanel: Boolean(document.querySelector('.control-panel')),
      steps: Boolean(document.querySelector('.learning-strip')),
      forest: Boolean(document.querySelector('.forest-footer')),
      rootAccent: getComputedStyle(document.documentElement).getPropertyValue('--green').trim(),
      bodyBackground: getComputedStyle(document.body).backgroundImage,
      modeAnimation: getComputedStyle(document.querySelector('.mode-tab:not(.active)')).animationName,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      fullscreenButton: Boolean(document.querySelector('#fullscreenToggle')),
      soundIcon: document.querySelector('#soundIcon')?.getAttribute('src')
    };
  })()`);
  assert(JSON.stringify(desktop.modes) === JSON.stringify(modes.map(mode => mode.id)), `Wrong modes: ${JSON.stringify(desktop)}`);
  assert(desktop.brandTitle <= 41 && desktop.brandSubtitle === 14, `Brand copy was enlarged: ${JSON.stringify(desktop)}`);
  assert(desktop.modeFont >= 19 && desktop.promptFont >= 42 && desktop.challengeFont >= 44 && desktop.feedbackFont >= 28, `Classroom copy is too small: ${JSON.stringify(desktop)}`);
  assert(desktop.panel.width >= desktop.shell.width - 2 && !desktop.sidePanel && !desktop.steps && !desktop.forest, `Legacy layout is still present: ${JSON.stringify(desktop)}`);
  assert(desktop.icons.length === 5 && desktop.icons.every(Boolean), `Crayon icons failed to load: ${JSON.stringify(desktop)}`);
  assert(desktop.rootAccent === "#7a350e" && desktop.bodyBackground.includes("rgb(255, 250, 240)") && desktop.bodyBackground.includes("rgb(255, 224, 148)"), `Theme regressed: ${JSON.stringify(desktop)}`);
  assert(desktop.modeAnimation === "choice-nudge" && !desktop.horizontalOverflow && desktop.fullscreenButton && desktop.soundIcon.endsWith("assets/ui-icons/sound-on.png"), `Controls or motion regressed: ${JSON.stringify(desktop)}`);

  const screenshot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(join(tmpdir(), "fraction-edcloud-smoke-desktop.png"), Buffer.from(screenshot.data, "base64"));

  await call("Emulation.setEmulatedMedia", { media: "screen", features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  assert(await evaluate(`getComputedStyle(document.querySelector('.mode-tab:not(.active)')).animationName === 'none'`), "Reduced-motion mode did not disable nudges.");
  await call("Emulation.setEmulatedMedia", { media: "screen", features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });

  for (const mode of modes) {
    await evaluate(`document.querySelector('.mode-tab[data-mode="${mode.id}"]').click()`);
    await waitFor(`document.querySelector('.mode-tab.active')?.dataset.mode === '${mode.id}'`, `${mode.id} did not activate.`);
    const configured = await evaluate(`(() => {
      const guide = document.querySelector('edcloud-operation-guide');
      return {
        hidden: guide.shadowRoot.querySelector('.guide-layer').hidden,
        ids: guide._config.steps.map(step => step.id),
        firstTarget: guide._config.steps[0].target,
        lastTarget: guide._config.steps.at(-1).target,
        allTargetsExist: guide._config.steps.every(step => Boolean(document.querySelector(step.target)))
      };
    })()`);
    assert(configured.hidden && configured.ids.length === 5 && configured.ids.every(id => id.startsWith(`${mode.id}-`)), `${mode.id} guide is not mode-specific: ${JSON.stringify(configured)}`);
    assert(configured.firstTarget === `.mode-tab[data-mode="${mode.id}"]` && configured.lastTarget === "#checkBtn" && configured.allTargetsExist, `${mode.id} guide targets are wrong: ${JSON.stringify(configured)}`);
    await delay(200);
    const modeScreenshot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
    writeFileSync(join(tmpdir(), `fraction-edcloud-${mode.id}.png`), Buffer.from(modeScreenshot.data, "base64"));
    if (mode.id === "pizza") {
      const baseTexture = await evaluate(`getComputedStyle(document.querySelector('.pizza-slice')).fill`);
      await evaluate(`document.querySelector('.pizza-slice').dispatchEvent(new MouseEvent('click', { bubbles: true }))`);
      const crayonPizza = await evaluate(`(() => ({
        selectedTexture: getComputedStyle(document.querySelector('.pizza-slice.is-selected')).fill,
        crustLayers: document.querySelectorAll('.pizza-crust, .pizza-crust-color, .pizza-crust-wax').length,
        toppingHighlights: document.querySelectorAll('.pizza-topping-highlight').length
      }))()`);
      assert(baseTexture.includes("pizza-crayon-cheese") && crayonPizza.selectedTexture.includes("pizza-crayon-selected") && crayonPizza.crustLayers === 3 && crayonPizza.toppingHighlights === 7, `Pizza crayon styling is incomplete: ${JSON.stringify({ baseTexture, crayonPizza })}`);
      const selectedScreenshot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
      writeFileSync(join(tmpdir(), "fraction-edcloud-pizza-selected.png"), Buffer.from(selectedScreenshot.data, "base64"));
      await evaluate(`document.querySelector('.pizza-slice.is-selected').dispatchEvent(new MouseEvent('click', { bubbles: true }))`);
    }
    await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.actor-button').click()`);
    await waitFor(`!document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.guide-layer').hidden`, `${mode.id} guide did not open.`);
    const opened = await evaluate(`(() => {
      const root = document.querySelector('edcloud-operation-guide').shadowRoot;
      return {
        title: root.querySelector('#guide-title').textContent,
        count: root.querySelector('.step-count').textContent,
        narration: root.querySelector('.narration').src,
        titleSize: Number.parseFloat(getComputedStyle(root.querySelector('#guide-title')).fontSize),
        bodySize: Number.parseFloat(getComputedStyle(root.querySelector('.guide-body')).fontSize)
      };
    })()`);
    assert(opened.title === mode.goal && opened.count.includes("1") && opened.count.includes("5") && opened.narration.includes(`/bm/contextual/${mode.key}.mp3`) && opened.titleSize >= 50 && opened.bodySize >= 38, `${mode.id} guide copy, narration, or type is wrong: ${JSON.stringify(opened)}`);
    await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.close-button').click()`);
    await waitFor(`(() => { const guide = document.querySelector('edcloud-operation-guide'); return guide.shadowRoot.querySelector('.guide-layer').hidden && !guide._closing && !guide._moving; })()`, `${mode.id} guide did not close.`);
  }

  await evaluate(`document.querySelector('.mode-tab[data-mode="set"]').click()`);
  await waitFor(`document.querySelector('.mode-tab.active')?.dataset.mode === 'set'`, "Set mode did not activate for celebration test.");
  await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.actor-button').click()`);
  await waitFor(`!document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.guide-layer').hidden`, "Guide did not reopen for localization test.");
  await evaluate(`document.querySelector('.language-btn[data-lang="zh"]').click()`);
  await waitFor(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('#guide-title').textContent === '学习集合分数'`, "Chinese guide copy did not synchronize.");
  assert(await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.narration').src.includes('/zh/contextual/goal-set.mp3')`), "Chinese narration did not synchronize.");
  await evaluate(`document.querySelector('#soundToggle').click()`);
  assert(await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.replay-button').disabled && document.querySelector('#soundIcon').src.endsWith('/assets/ui-icons/sound-off.png')`), "Guide mute state did not synchronize.");
  await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.close-button').click()`);
  await waitFor(`(() => { const guide = document.querySelector('edcloud-operation-guide'); return guide.shadowRoot.querySelector('.guide-layer').hidden && !guide._closing && !guide._moving; })()`, "Localized guide did not close.");
  await evaluate(`document.querySelector('#soundToggle').click(); document.querySelector('#teacherBtn').click()`);
  await waitFor(`document.querySelector('#teacherDialog').open`, "Teacher dialog did not open for group-overflow test.");
  await evaluate(`(() => {
    document.querySelector('#teacher-numerator').value = '2';
    document.querySelector('#teacher-denominator').value = '5';
    document.querySelector('#teacher-groupSize').value = '3';
    document.querySelector('#teacherForm').requestSubmit();
  })()`);
  await waitFor(`document.querySelectorAll('.object-group[data-object-count="3"]').length === 5`, "Worst-case grouped set was not rendered.");
  await call("Emulation.setDeviceMetricsOverride", { width: 1192, height: 800, deviceScaleFactor: 1, mobile: false });
  await delay(250);
  const groupedSet = await evaluate(`(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    groups: [...document.querySelectorAll('.object-group')].map(group => {
      const objects = group.querySelector('.group-objects');
      const bounds = objects.getBoundingClientRect();
      return {
        groupOverflow: group.scrollWidth > group.clientWidth + 1,
        objectOverflow: objects.scrollWidth > objects.clientWidth + 1,
        iconsInside: [...objects.children].every(icon => {
          const rect = icon.getBoundingClientRect();
          return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1;
        })
      };
    })
  }))()`);
  assert(!groupedSet.horizontalOverflow && groupedSet.groups.length === 5 && groupedSet.groups.every(group => !group.groupOverflow && !group.objectOverflow && group.iconsInside), `Grouped objects overflow their cards: ${JSON.stringify(groupedSet)}`);
  const groupedScreenshot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(join(tmpdir(), "fraction-edcloud-grouped-1192.png"), Buffer.from(groupedScreenshot.data, "base64"));
  await call("Emulation.setDeviceMetricsOverride", { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });
  await evaluate(`document.querySelector('.language-btn[data-lang="bm"]').click()`);
  await evaluate(`(() => {
    const needed = Number(document.querySelector('.challenge-value .numerator').textContent);
    [...document.querySelectorAll('.object-group')].slice(0, needed).forEach(button => button.click());
    document.querySelector('#checkBtn').click();
  })()`);
  await waitFor(`document.querySelector('edcloud-correct-celebration')?.shadowRoot.querySelector('.cc-dialog')?.open`, "Correct-answer celebration did not open.");
  assert(await evaluate(`document.querySelector('edcloud-correct-celebration').shadowRoot.querySelector('.cc-title').textContent === 'Betul!'`), "Celebration title is wrong.");
  await evaluate(`window.EdCloudCorrectCelebration.close('smoke-test')`);
  await waitFor(`!document.querySelector('edcloud-correct-celebration').shadowRoot.querySelector('.cc-dialog').open`, "Celebration did not close.");

  await evaluate(`document.querySelector('.language-btn[data-lang="zh"]').click()`);
  await waitFor(`document.documentElement.lang === 'zh-Hans'`, "Chinese UI did not activate.");
  assert(await evaluate(`document.querySelector('#feedback').classList.contains('success') && document.querySelector('#feedback').textContent.includes('答对了')`), "Solved feedback did not remain synchronized after language change.");
  await evaluate(`document.querySelector('.language-btn[data-lang="bm"]').click()`);

  await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await delay(250);
  const mobile = await evaluate(`(() => ({
    width: innerWidth,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    modes: [...document.querySelectorAll('.mode-tab')].map(button => button.getBoundingClientRect().toJSON()),
    panel: document.querySelector('.visual-panel').getBoundingClientRect().toJSON(),
    iconWidths: [...document.querySelectorAll('.mode-icon')].map(icon => Number.parseFloat(getComputedStyle(icon).width)),
    challengeSize: Number.parseFloat(getComputedStyle(document.querySelector('.challenge-value')).fontSize),
    groupsFit: [...document.querySelectorAll('.object-group')].every(group => {
      const objects = group.querySelector('.group-objects');
      return group.scrollWidth <= group.clientWidth + 1 && objects.scrollWidth <= objects.clientWidth + 1;
    })
  }))()`);
  assert(mobile.width === 390 && !mobile.horizontalOverflow, `Mobile layout overflows: ${JSON.stringify(mobile)}`);
  assert(mobile.modes.length === 5 && mobile.modes.every(rect => rect.left >= 0 && rect.right <= 390), `A mobile mode is outside the viewport: ${JSON.stringify(mobile)}`);
  assert(mobile.panel.top < 620 && mobile.iconWidths.every(width => width >= 39) && mobile.challengeSize >= 38 && mobile.groupsFit, `Mobile classroom layout is too small, too low, or has group overflow: ${JSON.stringify(mobile)}`);
  const mobileScreenshot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(join(tmpdir(), "fraction-edcloud-smoke-mobile.png"), Buffer.from(mobileScreenshot.data, "base64"));

  await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.actor-button').click()`);
  await waitFor(`!document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.guide-layer').hidden`, "Mobile guide did not open.");
  const mobileCard = await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.guide-card').getBoundingClientRect().toJSON()`);
  assert(mobileCard.left >= 0 && mobileCard.right <= 390 && mobileCard.top >= 0 && mobileCard.bottom <= 844, `Mobile guide is outside the viewport: ${JSON.stringify(mobileCard)}`);
  await evaluate(`document.querySelector('edcloud-operation-guide').shadowRoot.querySelector('.close-button').click()`);

  assert(browserErrors.length === 0, `Browser errors: ${browserErrors.join(" | ")}`);
  console.log(JSON.stringify({
    status: "passed",
    year3FractionModes: 5,
    stepsPerMode: 5,
    contextualNarrations: 75,
    crayonModeIcons: 5,
    groupObjectOverflowRegression: true,
    desktopWhiteboardType: true,
    periodicChoiceNudges: true,
    reducedMotion: true,
    mobileViewport: "390x844",
    authorizationEntry: true,
    noAuthorizationPreview: true,
    unifiedSharedComponents: true,
    completionCelebration: true
  }, null, 2));
} finally {
  socket.close();
  const browserExited = browser.exitCode !== null ? Promise.resolve() : new Promise(resolveExit => browser.once("exit", resolveExit));
  browser.kill();
  await Promise.race([browserExited, delay(1500)]);
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 150 });
  } catch (_) {
    // Windows can hold the profile briefly after the browser exits.
  }
}
