# Smart Fraction Visual Tool - Math Year 3

Independent Math Year 3 edition based on the existing SJKC Year 3 Mathematics Jilid 1 tool.

- Fixed curriculum level: Math Year 3
- Modes: part of a group, pizza fractions, equivalent fractions, improper and mixed numbers, and hundred grid
- Languages: Bahasa Melayu, Chinese, and English
- Input: mouse, touch, and keyboard friendly
- Teacher controls: custom values within the existing activity limits
- Classroom layout: EdCloud yellow/orange/brown theme with large interactive-whiteboard type
- Shared components: current-mode operation guide and correct-answer celebration
- Guide narration: 25 contextual steps in BM, Chinese, and English (75 MP3 files)
- Original EdCloud-style wax-crayon navigation icons for all five modes

This edition intentionally remains Year 3 only.

## Local preview and checks

Open `index-preview.html` to view the tool without the EdCloud authorization handshake. The
production entry remains `index.html`.

```powershell
npm.cmd run check
npm.cmd test
```

The smoke test verifies all five modes, current-mode five-step guides, narration files, shared
celebration, desktop whiteboard sizing, reduced motion, and the 390×844 mobile layout.

Narration can be regenerated with `scripts/generate-guide-voices.py` after installing `edge-tts`.
The configured voices are `ms-MY-YasminNeural`, `zh-CN-XiaoxiaoNeural`, and
`en-SG-LunaNeural`, using speed `-10%` and pitch `0 Hz`.

## EdCloud authentication

The learning interface starts only after the EdCloud Tool protocol v1 handshake succeeds.
`auth-bootstrap.js` accepts the trusted EdCloud web launchers and the opaque parent used by the
native StudentApp wrapper, validates the short-lived Tools token through the same-origin
`/api/auth/me` endpoint, and then loads `app.js`.

The token remains in memory only. Do not add it to URLs, browser storage, logs, analytics, or
error messages. Any future protected request should use `createToolsAuthorizationHeader()` from
`edcloud-tool-auth.js` and a server endpoint protected by the EdCloud Tools authorization policy.

Direct navigation is intentionally denied. Local browser testing requires an EdCloud-compatible
launcher on the same `localhost` origin and a reverse proxy for `/api/auth/me`; serving these
static files by themselves is not enough to complete authentication.
