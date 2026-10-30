(() => {
  "use strict";

  const configuredGrade = window.FRACTION_VISUAL_GRADE === "d3"
    ? window.FRACTION_VISUAL_GRADE
    : "d3";
  const fixedYear = Number(configuredGrade.slice(1));

  const translations = {
    bm: {
      appTitle: "Jom Teroka Pecahan!",
      appSubtitle: "Lihat, sentuh dan fahami bahagiannya.",
      soundOn: "Bunyi",
      soundOff: "Senyap",
      fullscreen: "Skrin penuh",
      exitFullscreen: "Keluar penuh",
      modeSet: "Bahagian Kumpulan",
      modePizza: "Sebahagian daripada Satu Keseluruhan",
      modeEquivalent: "Pecahan Setara",
      modeMixed: "Tak Wajar & Bercampur",
      modeHundred: "Grid Seratus",
      chapter: "D3 · Jilid 1",
      learnBySeeing: "Belajar dengan melihat",
      teacherQuestion: "Guru buat soalan",
      teacherMode: "Mod guru",
      teacherTitle: "Bina soalan sendiri",
      teacherIntro: "Tetapkan nombor untuk aktiviti ini.",
      cancel: "Batal",
      useQuestion: "Gunakan soalan",
      newQuestion: "Cuba soalan lain",
      yourTask: "Mari cuba!",
      reset: "Mula semula",
      check: "Semak",
      next: "Soalan seterusnya",
      stepLook: "Lihat keseluruhan",
      stepTouch: "Pilih bahagiannya",
      stepConnect: "Hubungkan nilainya",
      prompts: {
        set: "Tunjukkan pecahan daripada kumpulan ini.",
        pizza: "Pilih kepingan piza untuk menunjukkan pecahan.",
        equivalent: "Warnakan bahagian yang sama banyak.",
        mixed: "Bina nilai ini dengan jalur pecahan.",
        hundred: "Warnakan grid supaya nilainya sepadan."
      },
      tips: {
        set: "Penyebut menunjukkan berapa kumpulan sama besar. Pengangka menunjukkan berapa kumpulan dipilih.",
        pizza: "Satu piza ialah satu keseluruhan. Setiap kepingan mesti sama besar.",
        equivalent: "Pecahan setara mempunyai saiz yang sama walaupun bilangannya berbeza.",
        mixed: "Satu jalur penuh mewakili satu keseluruhan.",
        hundred: "100 petak menghubungkan pecahan, perpuluhan dan peratus."
      },
      howTo: {
        set: "Tekan seluruh kumpulan, bukan satu objek sahaja.",
        pizza: "Tekan kepingan piza untuk memilih bahagiannya.",
        equivalent: "Tekan bahagian pada jalur bawah untuk mewarnakannya.",
        mixed: "Tekan kepingan dari kiri untuk membina nilainya.",
        hundred: "Tekan petak, guna butang atau gerakkan peluncur."
      },
      challengeLabels: {
        set: "Tunjukkan",
        pizza: "Tunjukkan pada piza",
        equivalent: "Lengkapkan pecahan setara",
        mixed: "Bina model ini",
        hundred: "Tunjukkan nilai ini"
      },
      ofObjects: "daripada {total} objek",
      referenceBar: "Jalur contoh",
      yourBar: "Jalur kamu",
      whole: "Keseluruhan {number}",
      group: "Kumpulan {number}",
      selectedGroups: "Kamu memilih {selected} daripada {total} kumpulan ({objects} daripada {objectTotal} objek).",
      selectedSlices: "Kamu memilih {selected} daripada {total} keping piza.",
      selectedParts: "Kamu mewarnakan {selected} daripada {total} bahagian.",
      selectedSquares: "Diwarnakan:",
      ready: {
        set: "Penyebut ialah jumlah kumpulan. Pengangka ialah bilangan kumpulan yang dipilih.",
        pizza: "Penyebut ialah jumlah kepingan sama besar. Pengangka ialah kepingan yang dipilih.",
        equivalent: "Bandingkan panjang warna pada kedua-dua jalur.",
        mixed: "Lengkapkan satu keseluruhan dahulu, kemudian bina baki bahagiannya.",
        hundred: "Setiap baris mempunyai 10 petak. Keseluruhan grid mempunyai 100 petak."
      },
      correct: "Betul!",
      wrong: {
        set: "Belum tepat. Bahagikan seluruh kumpulan kepada kumpulan yang sama besar.",
        pizza: "Belum tepat. Pilih bilangan kepingan yang ditunjukkan oleh pengangka.",
        equivalent: "Belum tepat. Pastikan panjang warna kedua-dua jalur sama.",
        mixed: "Belum tepat. Bina jalur penuh dahulu sebelum bahagian yang berikutnya.",
        hundred: "Belum tepat. Gunakan setiap baris sebagai 10 petak."
      },
      minusTen: "−10",
      minusOne: "−1",
      plusOne: "+1",
      plusTen: "+10",
      teacherLabels: {
        numerator: "Pengangka",
        denominator: "Penyebut",
        groupSize: "Objek setiap kumpulan",
        multiplier: "Gandaan penyebut",
        whole: "Nombor bulat",
        remainder: "Pengangka baki",
        direction: "Bentuk diberi",
        count: "Bilangan petak",
        representation: "Paparan soalan"
      },
      teacherOptions: {
        improper: "Pecahan tak wajar",
        mixed: "Nombor bercampur",
        fraction: "Pecahan / 100",
        decimal: "Perpuluhan",
        percent: "Peratus"
      },
      teacherInvalid: "Semak nilai dan julat yang dimasukkan. Untuk pecahan, pengangka mesti lebih kecil daripada penyebut."
    },
    zh: {
      appTitle: "一起来探索分数！",
      appSubtitle: "观察、操作，理解整体与部分。",
      soundOn: "声音",
      soundOff: "静音",
      fullscreen: "全屏",
      exitFullscreen: "退出全屏",
      modeSet: "一组的一部分",
      modePizza: "一个整体的一部分",
      modeEquivalent: "等值分数",
      modeMixed: "假分数与带分数",
      modeHundred: "百格图",
      chapter: "三年级 · 上册",
      learnBySeeing: "从图像中理解",
      teacherQuestion: "老师出题",
      teacherMode: "教师模式",
      teacherTitle: "自订题目",
      teacherIntro: "为目前的活动输入题目数值。",
      cancel: "取消",
      useQuestion: "使用这道题",
      newQuestion: "换一道题",
      yourTask: "试试看！",
      reset: "重新开始",
      check: "检查",
      next: "下一题",
      stepLook: "观察整体",
      stepTouch: "选择部分",
      stepConnect: "连接不同表示法",
      prompts: {
        set: "从这一组物体中表示指定的分数。",
        pizza: "选择披萨片来表示指定的分数。",
        equivalent: "涂出相同大小的部分。",
        mixed: "用分数条建构这个数值。",
        hundred: "涂色，使百格图符合所给的数值。"
      },
      tips: {
        set: "分母表示平均分成多少组，分子表示选了多少组。",
        pizza: "一个披萨是一个整体，每一片必须一样大。",
        equivalent: "等值分数的数字虽然不同，所表示的大小却相同。",
        mixed: "一条完整的分数条代表一个整体。",
        hundred: "100个小格可以连接分数、小数和百分比。"
      },
      howTo: {
        set: "点击整组物体，不是单独点击一个物体。",
        pizza: "点击披萨片，选择所需的部分。",
        equivalent: "点击下面分数条的格子来涂色。",
        mixed: "从左边点击小格，建构所给的数值。",
        hundred: "点击格子、使用按钮或移动滑杆。"
      },
      challengeLabels: {
        set: "请表示",
        pizza: "在披萨上表示",
        equivalent: "完成等值分数",
        mixed: "建构这个模型",
        hundred: "请表示这个数值"
      },
      ofObjects: "在{total}个物体中",
      referenceBar: "示范分数条",
      yourBar: "你的分数条",
      whole: "整体 {number}",
      group: "第{number}组",
      selectedGroups: "你选择了{total}组中的{selected}组（{objectTotal}个物体中的{objects}个）。",
      selectedSlices: "你选择了{total}片披萨中的{selected}片。",
      selectedParts: "你涂了{total}等份中的{selected}份。",
      selectedSquares: "已涂色：",
      ready: {
        set: "分母是总组数，分子是要选择的组数。",
        pizza: "分母是相同大小的披萨片总数，分子是选中的片数。",
        equivalent: "比较两条分数条中涂色部分的长度。",
        mixed: "先完成一个整体，再建构剩下的部分。",
        hundred: "每一行有10格，整个图共有100格。"
      },
      correct: "答对了！",
      wrong: {
        set: "还不正确。尝试把整组物体平均分组。",
        pizza: "还不正确。按照分子选择披萨片的数量。",
        equivalent: "还不正确。两条分数条的涂色长度必须相同。",
        mixed: "还不正确。先填满完整的分数条，再填下一条。",
        hundred: "还不正确。可以把每一行看成10格。"
      },
      minusTen: "−10",
      minusOne: "−1",
      plusOne: "+1",
      plusTen: "+10",
      teacherLabels: {
        numerator: "分子",
        denominator: "分母",
        groupSize: "每组物体数量",
        multiplier: "分母的倍数",
        whole: "整数部分",
        remainder: "剩余分子",
        direction: "题目形式",
        count: "涂色格数",
        representation: "显示方式"
      },
      teacherOptions: {
        improper: "假分数",
        mixed: "带分数",
        fraction: "分数 / 100",
        decimal: "小数",
        percent: "百分比"
      },
      teacherInvalid: "请检查输入数值和允许范围；分数题的分子必须小于分母。"
    },
    en: {
      appTitle: "Let's Explore Fractions!",
      appSubtitle: "See, touch and understand parts of a whole.",
      soundOn: "Sound",
      soundOff: "Muted",
      fullscreen: "Full screen",
      exitFullscreen: "Exit full screen",
      modeSet: "Part of a Group",
      modePizza: "Part of One Whole",
      modeEquivalent: "Equivalent Fractions",
      modeMixed: "Improper & Mixed",
      modeHundred: "Hundred Grid",
      chapter: "Year 3 · Volume 1",
      learnBySeeing: "Learn by seeing",
      teacherQuestion: "Teacher question",
      teacherMode: "Teacher mode",
      teacherTitle: "Create a question",
      teacherIntro: "Set the values for the current activity.",
      cancel: "Cancel",
      useQuestion: "Use this question",
      newQuestion: "Try another question",
      yourTask: "Let's try!",
      reset: "Start again",
      check: "Check",
      next: "Next question",
      stepLook: "Look at the whole",
      stepTouch: "Choose the part",
      stepConnect: "Connect the values",
      prompts: {
        set: "Show the fraction of this group.",
        pizza: "Choose pizza slices to show the fraction.",
        equivalent: "Shade the same amount.",
        mixed: "Build this value with fraction strips.",
        hundred: "Shade the grid to match the value."
      },
      tips: {
        set: "The denominator tells how many equal groups. The numerator tells how many groups are chosen.",
        pizza: "One pizza is one whole. Every slice must be the same size.",
        equivalent: "Equivalent fractions have the same size even when their numbers are different.",
        mixed: "One full strip represents one whole.",
        hundred: "100 squares connect fractions, decimals and percentages."
      },
      howTo: {
        set: "Tap a whole group, not one object at a time.",
        pizza: "Tap pizza slices to choose the required part.",
        equivalent: "Tap sections of the lower bar to shade them.",
        mixed: "Tap pieces from the left to build the value.",
        hundred: "Tap a square, use the buttons, or move the slider."
      },
      challengeLabels: {
        set: "Show",
        pizza: "Show on the pizza",
        equivalent: "Complete the equivalent fraction",
        mixed: "Build this model",
        hundred: "Show this value"
      },
      ofObjects: "of {total} objects",
      referenceBar: "Example bar",
      yourBar: "Your bar",
      whole: "Whole {number}",
      group: "Group {number}",
      selectedGroups: "You selected {selected} of {total} groups ({objects} of {objectTotal} objects).",
      selectedSlices: "You selected {selected} of {total} pizza slices.",
      selectedParts: "You shaded {selected} of {total} parts.",
      selectedSquares: "Shaded:",
      ready: {
        set: "The denominator is the number of groups. The numerator is the number of groups chosen.",
        pizza: "The denominator is the total equal slices. The numerator is the slices chosen.",
        equivalent: "Compare the shaded length of both bars.",
        mixed: "Complete one whole first, then build the remaining part.",
        hundred: "Each row has 10 squares. The whole grid has 100 squares."
      },
      correct: "Correct!",
      wrong: {
        set: "Not yet. Try splitting the whole group into equal groups.",
        pizza: "Not yet. Choose the number of slices shown by the numerator.",
        equivalent: "Not yet. The shaded length of both bars must match.",
        mixed: "Not yet. Fill complete strips before moving to the next strip.",
        hundred: "Not yet. Use each row as a group of 10 squares."
      },
      minusTen: "−10",
      minusOne: "−1",
      plusOne: "+1",
      plusTen: "+10",
      teacherLabels: {
        numerator: "Numerator",
        denominator: "Denominator",
        groupSize: "Objects in each group",
        multiplier: "Denominator multiplier",
        whole: "Whole number",
        remainder: "Remaining numerator",
        direction: "Question form",
        count: "Number of squares",
        representation: "Show as"
      },
      teacherOptions: {
        improper: "Improper fraction",
        mixed: "Mixed number",
        fraction: "Fraction / 100",
        decimal: "Decimal",
        percent: "Percentage"
      },
      teacherInvalid: "Check the values and allowed ranges. For fractions, the numerator must be smaller than the denominator."
    }
  };

  const guideCopy = (bmTitle, bmBody, zhTitle, zhBody, enTitle, enBody) => ({
    bm: { title: bmTitle, body: bmBody },
    zh: { title: zhTitle, body: zhBody },
    en: { title: enTitle, body: enBody }
  });

  const FRACTION_GUIDE_COPY = {
    "goal-set": guideCopy("Belajar pecahan kumpulan", "Belajar melihat satu pecahan sebagai beberapa kumpulan sama besar yang dipilih daripada keseluruhan.", "学习集合分数", "学习把整体平均分组，并找出被选中的组所表示的分数。", "Learn group fractions", "Learn to see a fraction as equal groups chosen from the whole set."),
    "set-read": guideCopy("Baca pecahan", "Nombor atas ialah kumpulan yang perlu dipilih; nombor bawah ialah jumlah kumpulan sama besar.", "读出分数", "上面的数是要选择的组数，下面的数是平均分成的总组数。", "Read the fraction", "The top number is how many groups to choose; the bottom number is the total number of equal groups."),
    "set-groups": guideCopy("Lihat kumpulan", "Setiap kotak ialah satu kumpulan yang sama besar.", "观察分组", "每个框都是一个数量相同的小组。", "See the groups", "Each box is one equal-sized group."),
    "set-select": guideCopy("Pilih seluruh kumpulan", "Tekan seluruh kotak kumpulan sehingga bilangannya sama dengan pengangka.", "选择整组", "点击整个分组框，直到所选组数与分子相同。", "Choose whole groups", "Tap whole group boxes until the number chosen matches the numerator."),
    "set-check": guideCopy("Semak jawapan", "Lihat bilangan kumpulan yang dipilih, kemudian tekan Semak.", "检查答案", "确认所选组数后，点击检查。", "Check the answer", "Review the number of selected groups, then press Check."),

    "goal-pizza": guideCopy("Belajar pecahan piza", "Belajar bahawa satu keseluruhan boleh dibahagi kepada kepingan yang sama besar.", "学习披萨分数", "学习把一个整体平均分成相同大小的部分。", "Learn pizza fractions", "Learn that one whole can be divided into equal-sized slices."),
    "pizza-read": guideCopy("Baca pecahan", "Penyebut menunjukkan jumlah kepingan dan pengangka menunjukkan kepingan yang dipilih.", "读出分数", "分母表示总片数，分子表示要选择的片数。", "Read the fraction", "The denominator shows all slices and the numerator shows how many to choose."),
    "pizza-equal": guideCopy("Lihat kepingan sama", "Semua kepingan piza mempunyai saiz yang sama.", "观察相等部分", "所有披萨片的大小都相同。", "See equal slices", "Every pizza slice is the same size."),
    "pizza-choose": guideCopy("Pilih kepingan", "Tekan kepingan sehingga bilangan yang dipilih sama dengan pengangka.", "选择披萨片", "点击披萨片，直到所选片数与分子相同。", "Choose the slices", "Tap slices until the number selected matches the numerator."),
    "pizza-check": guideCopy("Semak jawapan", "Baca pecahan yang terbina, kemudian tekan Semak.", "检查答案", "读一读组成的分数，然后点击检查。", "Check the answer", "Read the fraction you built, then press Check."),

    "goal-equivalent": guideCopy("Belajar pecahan setara", "Belajar bahawa pecahan dengan nombor berbeza boleh menunjukkan saiz yang sama.", "学习等值分数", "学习数字不同的分数也可以表示相同的大小。", "Learn equivalent fractions", "Learn that fractions with different numbers can show the same amount."),
    "equivalent-read": guideCopy("Baca sasaran", "Lengkapkan pecahan kedua supaya panjang warnanya sama dengan pecahan contoh.", "读出目标", "完成第二个分数，让涂色长度与示范分数相同。", "Read the target", "Complete the second fraction so its shaded length matches the example."),
    "equivalent-reference": guideCopy("Lihat jalur contoh", "Perhatikan berapa banyak bahagian dan panjang warna pada jalur pertama.", "观察示范条", "看看第一条分成多少份，以及涂色部分有多长。", "See the example bar", "Notice the parts and the shaded length in the first bar."),
    "equivalent-shade": guideCopy("Warnakan panjang sama", "Tekan jalur bawah dari kiri sehingga kedua-dua warna sama panjang.", "涂出相同长度", "从左边点击下面的分数条，直到两条涂色长度相同。", "Shade the same length", "Tap the lower bar from the left until both shaded lengths match."),
    "equivalent-check": guideCopy("Semak kesetaraan", "Bandingkan kedua-dua panjang, kemudian tekan Semak.", "检查是否等值", "比较两条涂色长度，然后点击检查。", "Check equivalence", "Compare both lengths, then press Check."),

    "goal-mixed": guideCopy("Belajar nombor bercampur", "Belajar menghubungkan pecahan tak wajar dengan keseluruhan dan bahagian yang berbaki.", "学习带分数", "学习把假分数连接成完整的整体和剩余部分。", "Learn mixed numbers", "Learn to connect an improper fraction with wholes and a remaining part."),
    "mixed-read": guideCopy("Baca nilai", "Lihat sama ada soalan menunjukkan pecahan tak wajar atau nombor bercampur.", "读出数值", "先看题目给的是假分数还是带分数。", "Read the value", "See whether the question shows an improper fraction or a mixed number."),
    "mixed-whole": guideCopy("Lengkapkan keseluruhan", "Isi semua bahagian pada satu jalur sebelum bergerak ke jalur seterusnya.", "先完成整体", "先填满一整条，再继续下一条。", "Complete each whole", "Fill every part of one strip before moving to the next strip."),
    "mixed-remainder": guideCopy("Bina bahagian baki", "Selepas jalur penuh, isi bahagian yang masih diperlukan.", "组成剩余部分", "完成整条后，再填入剩余需要的部分。", "Build the remainder", "After the full strips, fill the remaining parts you need."),
    "mixed-check": guideCopy("Semak model", "Bandingkan model dengan nilai soalan, kemudian tekan Semak.", "检查模型", "把模型和题目数值比较，然后点击检查。", "Check the model", "Compare the model with the given value, then press Check."),

    "goal-hundred": guideCopy("Belajar grid seratus", "Belajar menghubungkan pecahan per seratus, perpuluhan dan peratus pada satu grid.", "学习百格图", "学习用百格图连接百分数、小数和分母为一百的分数。", "Learn the hundred grid", "Learn to connect hundredths, decimals and percentages on one grid."),
    "hundred-read": guideCopy("Baca nilai", "Kenal pasti sama ada soalan diberi sebagai pecahan, perpuluhan atau peratus.", "读出数值", "辨认题目给的是分数、小数还是百分数。", "Read the value", "Identify whether the value is shown as a fraction, decimal or percentage."),
    "hundred-grid": guideCopy("Kira petak", "Setiap petak ialah satu per seratus dan setiap baris mempunyai sepuluh petak.", "数一数格子", "每一格是一百分之一，每一行有十格。", "Count the squares", "Each square is one hundredth and every row contains ten squares."),
    "hundred-adjust": guideCopy("Warnakan grid", "Tekan petak, gunakan butang atau gerakkan peluncur untuk membina nilai.", "给百格图涂色", "点击格子、使用按钮或移动滑杆来组成数值。", "Shade the grid", "Tap squares, use the buttons, or move the slider to build the value."),
    "hundred-check": guideCopy("Semak tiga bentuk", "Pastikan bilangan petak sepadan dengan nilai, kemudian tekan Semak.", "检查三种表示", "确认涂色格数与数值相同，然后点击检查。", "Check all forms", "Make sure the shaded squares match the value, then press Check.")
  };

  const fractionChoices = [
    [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5]
  ];
  const pizzaChoices = [
    ...fractionChoices, [1, 6], [5, 6], [3, 8], [5, 8], [7, 8]
  ];
  const objectIcons = ["⭐", "🧸", "🟠", "🔶", "🌞", "🪙"];
  const hundredValues = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];

  const state = {
    lang: "bm",
    sound: true,
    mode: "set",
    question: null,
    selectedIndices: new Set(),
    selectedCount: 0,
    solved: false
  };

  let audioContext = null;
  let operationGuide = null;
  let activeGuideMode = null;
  let configuredGuideMode = null;

  const modeTabs = document.getElementById("modeTabs");
  const soundToggle = document.getElementById("soundToggle");
  const soundIcon = document.getElementById("soundIcon");
  const fullscreenToggle = document.getElementById("fullscreenToggle");
  const modeTitle = document.getElementById("modeTitle");
  const conceptTip = document.getElementById("conceptTip");
  const howToText = document.getElementById("howToText");
  const promptText = document.getElementById("promptText");
  const challengeDisplay = document.getElementById("challengeDisplay");
  const conceptStage = document.getElementById("conceptStage");
  const feedback = document.getElementById("feedback");
  const resetBtn = document.getElementById("resetBtn");
  const checkBtn = document.getElementById("checkBtn");
  const newQuestionBtn = document.getElementById("newQuestionBtn");
  const teacherBtn = document.getElementById("teacherBtn");
  const teacherDialog = document.getElementById("teacherDialog");
  const teacherForm = document.getElementById("teacherForm");
  const teacherFields = document.getElementById("teacherFields");
  const teacherError = document.getElementById("teacherError");
  const teacherCloseBtn = document.getElementById("teacherCloseBtn");
  const teacherCancelBtn = document.getElementById("teacherCancelBtn");
  const chapterEyebrow = document.querySelector("[data-i18n='chapter']");
  const levelBadge = document.getElementById("levelBadge");

  const guideLanguage = () => state.lang;

  function guideNarration(key) {
    return {
      bm: new URL(`assets/operation-guide/voices/bm/contextual/${key}.mp3`, document.baseURI).href,
      zh: new URL(`assets/operation-guide/voices/zh/contextual/${key}.mp3`, document.baseURI).href,
      en: new URL(`assets/operation-guide/voices/en/contextual/${key}.mp3`, document.baseURI).href
    };
  }

  function fractionGuideStep(mode, key, target) {
    return { id: `${mode}-${key}`, target, content: FRACTION_GUIDE_COPY[key], narration: guideNarration(key) };
  }

  function getModeGuideSteps(mode) {
    const modeTarget = `.mode-tab[data-mode="${mode}"]`;
    const flows = {
      set: [
        fractionGuideStep(mode, "goal-set", modeTarget),
        fractionGuideStep(mode, "set-read", "#challengeDisplay"),
        fractionGuideStep(mode, "set-groups", "#conceptStage .grouped-set"),
        fractionGuideStep(mode, "set-select", "#conceptStage .selection-readout"),
        fractionGuideStep(mode, "set-check", "#checkBtn")
      ],
      pizza: [
        fractionGuideStep(mode, "goal-pizza", modeTarget),
        fractionGuideStep(mode, "pizza-read", "#challengeDisplay"),
        fractionGuideStep(mode, "pizza-equal", "#conceptStage .pizza-svg"),
        fractionGuideStep(mode, "pizza-choose", "#conceptStage .pizza-guide"),
        fractionGuideStep(mode, "pizza-check", "#checkBtn")
      ],
      equivalent: [
        fractionGuideStep(mode, "goal-equivalent", modeTarget),
        fractionGuideStep(mode, "equivalent-read", "#challengeDisplay"),
        fractionGuideStep(mode, "equivalent-reference", "#conceptStage .bar-row:first-child"),
        fractionGuideStep(mode, "equivalent-shade", "#conceptStage .bar-row:last-of-type"),
        fractionGuideStep(mode, "equivalent-check", "#checkBtn")
      ],
      mixed: [
        fractionGuideStep(mode, "goal-mixed", modeTarget),
        fractionGuideStep(mode, "mixed-read", "#challengeDisplay"),
        fractionGuideStep(mode, "mixed-whole", "#conceptStage .unit-bars"),
        fractionGuideStep(mode, "mixed-remainder", "#conceptStage .bar-readout"),
        fractionGuideStep(mode, "mixed-check", "#checkBtn")
      ],
      hundred: [
        fractionGuideStep(mode, "goal-hundred", modeTarget),
        fractionGuideStep(mode, "hundred-read", "#challengeDisplay"),
        fractionGuideStep(mode, "hundred-grid", "#conceptStage .hundred-grid"),
        fractionGuideStep(mode, "hundred-adjust", "#conceptStage .grid-controls"),
        fractionGuideStep(mode, "hundred-check", "#checkBtn")
      ]
    };
    return flows[mode] || flows.set;
  }

  function refreshOperationGuideSteps() {
    if (!operationGuide || activeGuideMode || configuredGuideMode === state.mode) return;
    operationGuide.configure({ steps: getModeGuideSteps(state.mode) });
    configuredGuideMode = state.mode;
  }

  async function initOperationGuide() {
    try {
      const sharedGuide = await window.EdCloudOperationGuideReady;
      if (!sharedGuide?.mount) return;
      operationGuide = sharedGuide.mount({
        guideId: "math-y3-smart-fraction-visual-tool",
        language: guideLanguage(),
        soundEnabled: state.sound,
        dockOffset: { right: 16, bottom: 20, mobileRight: 10, mobileBottom: 20 },
        steps: getModeGuideSteps(state.mode)
      });
      configuredGuideMode = state.mode;
      operationGuide.addEventListener("guide-started", () => { activeGuideMode = state.mode; });
      operationGuide.addEventListener("guide-closed", () => {
        activeGuideMode = null;
        refreshOperationGuideSteps();
      });
    } catch (error) {
      console.warn("Shared operation guide failed to initialize.", error);
    }
  }

  function t() {
    return translations[state.lang];
  }

  function gradeName() {
    if (state.lang === "zh") return "数学三年级";
    if (state.lang === "en") return `Math Year ${fixedYear}`;
    return `Matematik Tahun ${fixedYear}`;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function fractionMarkup(numerator, denominator, className = "") {
    return `<span class="fraction ${className}" aria-label="${numerator}/${denominator}"><span class="numerator">${numerator}</span><span class="fraction-line"></span><span class="denominator">${denominator}</span></span>`;
  }

  function mixedMarkup(whole, numerator, denominator) {
    return `<span class="mixed-number"><span class="whole-number">${whole}</span>${fractionMarkup(numerator, denominator)}</span>`;
  }

  function formatTemplate(template, values) {
    return Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), template);
  }

  function decimalFor(count) {
    return (count / 100).toFixed(2).replace(/0$/, "");
  }

  function generateQuestion() {
    let question;

    if (state.mode === "set") {
      const [numerator, denominator] = pick(fractionChoices);
      const groupSize = randomInt(2, 3);
      question = {
        numerator,
        denominator,
        groupSize,
        total: denominator * groupSize,
        expected: numerator,
        icon: pick(objectIcons)
      };
    } else if (state.mode === "pizza") {
      const [numerator, denominator] = pick(pizzaChoices);
      question = { numerator, denominator, expected: numerator };
    } else if (state.mode === "equivalent") {
      const [numerator, denominator] = pick(fractionChoices);
      const possibleMultipliers = denominator <= 3 ? [2, 3] : [2];
      const multiplier = pick(possibleMultipliers);
      question = {
        numerator,
        denominator,
        equivalentNumerator: numerator * multiplier,
        equivalentDenominator: denominator * multiplier,
        expected: numerator * multiplier
      };
    } else if (state.mode === "mixed") {
      const denominator = randomInt(2, 5);
      const whole = randomInt(1, 2);
      const remainder = randomInt(1, denominator - 1);
      question = {
        denominator,
        whole,
        remainder,
        improperNumerator: whole * denominator + remainder,
        unitCount: whole + 1,
        direction: Math.random() < .5 ? "improper" : "mixed",
        expected: whole * denominator + remainder
      };
    } else {
      const count = pick(hundredValues);
      question = {
        count,
        representation: pick(["fraction", "decimal", "percent"]),
        expected: count
      };
    }

    state.question = question;
    state.selectedIndices = new Set();
    state.selectedCount = 0;
    state.solved = false;
    renderQuestion();
  }

  function applyTranslations() {
    document.documentElement.lang = state.lang === "zh" ? "zh-Hans" : state.lang === "bm" ? "ms" : "en";
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (typeof t()[key] === "string") element.textContent = t()[key];
    });

    soundToggle.querySelector("span:last-child").textContent = state.sound ? t().soundOn : t().soundOff;
    soundIcon.src = state.sound ? "assets/ui-icons/sound-on.png" : "assets/ui-icons/sound-off.png";
    soundToggle.setAttribute("aria-label", state.sound ? t().soundOn : t().soundOff);
    chapterEyebrow?.replaceChildren(document.createTextNode(t().chapter));
    levelBadge.textContent = gradeName();
    document.title = `${t().appTitle} · ${gradeName()}`;
    if (modeTitle) modeTitle.textContent = t()[`mode${state.mode.charAt(0).toUpperCase()}${state.mode.slice(1)}`];
    if (conceptTip) conceptTip.textContent = t().tips[state.mode];
    if (howToText) howToText.textContent = t().howTo[state.mode];
    promptText.textContent = t().prompts[state.mode];
    updateFullscreenButton();
  }

  function updateFullscreenButton() {
    const fullscreen = Boolean(document.fullscreenElement);
    const label = fullscreen ? t().exitFullscreen : t().fullscreen;
    fullscreenToggle.querySelector("span:last-child").textContent = label;
    fullscreenToggle.setAttribute("aria-pressed", String(fullscreen));
    fullscreenToggle.setAttribute("aria-label", label);
  }

  function openTeacherDialog() {
    renderTeacherFields();
    teacherDialog.showModal();
    window.setTimeout(() => teacherFields.querySelector("input, select")?.focus(), 0);
  }

  function renderTeacherFields() {
    teacherFields.replaceChildren();
    teacherError.textContent = "";
    const question = state.question;

    if (state.mode === "set") {
      addNumberField("numerator", t().teacherLabels.numerator, question.numerator, 1, 5);
      addNumberField("denominator", t().teacherLabels.denominator, question.denominator, 2, 6);
      addNumberField("groupSize", t().teacherLabels.groupSize, question.groupSize, 1, 5, true);
    } else if (state.mode === "pizza") {
      addNumberField("numerator", t().teacherLabels.numerator, question.numerator, 1, 9);
      addNumberField("denominator", t().teacherLabels.denominator, question.denominator, 2, 10);
    } else if (state.mode === "equivalent") {
      addNumberField("numerator", t().teacherLabels.numerator, question.numerator, 1, 5);
      addNumberField("denominator", t().teacherLabels.denominator, question.denominator, 2, 6);
      addNumberField("multiplier", t().teacherLabels.multiplier, question.equivalentDenominator / question.denominator, 2, 3, true);
    } else if (state.mode === "mixed") {
      addNumberField("whole", t().teacherLabels.whole, question.whole, 1, 3);
      addNumberField("remainder", t().teacherLabels.remainder, question.remainder, 1, 7);
      addNumberField("denominator", t().teacherLabels.denominator, question.denominator, 2, 8);
      addSelectField("direction", t().teacherLabels.direction, question.direction, [
        ["improper", t().teacherOptions.improper],
        ["mixed", t().teacherOptions.mixed]
      ]);
    } else {
      addNumberField("count", t().teacherLabels.count, question.count, 0, 100);
      addSelectField("representation", t().teacherLabels.representation, question.representation, [
        ["fraction", t().teacherOptions.fraction],
        ["decimal", t().teacherOptions.decimal],
        ["percent", t().teacherOptions.percent]
      ]);
    }

    const preview = document.createElement("div");
    preview.className = "teacher-preview";
    preview.id = "teacherPreview";
    teacherFields.append(preview);
    teacherFields.querySelectorAll("input, select").forEach(control => control.addEventListener("input", updateTeacherPreview));
    updateTeacherPreview();
  }

  function addNumberField(name, labelText, value, min, max, wide = false) {
    const label = document.createElement("label");
    const text = document.createElement("span");
    const input = document.createElement("input");
    label.className = `teacher-field${wide ? " is-wide" : ""}`;
    text.textContent = labelText;
    input.type = "number";
    input.id = `teacher-${name}`;
    input.name = name;
    input.min = String(min);
    input.max = String(max);
    input.step = "1";
    input.value = String(value);
    input.required = true;
    label.append(text, input);
    teacherFields.append(label);
  }

  function addSelectField(name, labelText, value, options) {
    const label = document.createElement("label");
    const text = document.createElement("span");
    const select = document.createElement("select");
    label.className = "teacher-field";
    text.textContent = labelText;
    select.id = `teacher-${name}`;
    select.name = name;
    options.forEach(([optionValue, optionLabel]) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionLabel;
      option.selected = optionValue === value;
      select.append(option);
    });
    label.append(text, select);
    teacherFields.append(label);
  }

  function teacherNumber(name) {
    return Number(document.getElementById(`teacher-${name}`)?.value);
  }

  function updateTeacherPreview() {
    const preview = document.getElementById("teacherPreview");
    if (!preview) return;

    if (state.mode === "set") {
      const numerator = teacherNumber("numerator");
      const denominator = teacherNumber("denominator");
      const groupSize = teacherNumber("groupSize");
      preview.innerHTML = `${fractionMarkup(numerator, denominator)} <span>·</span> <span>${denominator * groupSize} ${state.lang === "zh" ? "个物体" : state.lang === "bm" ? "objek" : "objects"}</span>`;
    } else if (state.mode === "pizza") {
      preview.innerHTML = `<span aria-hidden="true">🍕</span>${fractionMarkup(teacherNumber("numerator"), teacherNumber("denominator"))}`;
    } else if (state.mode === "equivalent") {
      const numerator = teacherNumber("numerator");
      const denominator = teacherNumber("denominator");
      const multiplier = teacherNumber("multiplier");
      preview.innerHTML = `${fractionMarkup(numerator, denominator)} <span>=</span> ${fractionMarkup("?", denominator * multiplier)}`;
    } else if (state.mode === "mixed") {
      const whole = teacherNumber("whole");
      const remainder = teacherNumber("remainder");
      const denominator = teacherNumber("denominator");
      const direction = document.getElementById("teacher-direction")?.value;
      preview.innerHTML = direction === "improper"
        ? fractionMarkup(whole * denominator + remainder, denominator)
        : mixedMarkup(whole, remainder, denominator);
    } else {
      const count = teacherNumber("count");
      const representation = document.getElementById("teacher-representation")?.value;
      if (representation === "fraction") preview.innerHTML = fractionMarkup(count, 100);
      else if (representation === "decimal") preview.textContent = decimalFor(count);
      else preview.textContent = `${count}%`;
    }
  }

  function applyTeacherQuestion(event) {
    event.preventDefault();
    let question = null;

    if (state.mode === "set") {
      const numerator = teacherNumber("numerator");
      const denominator = teacherNumber("denominator");
      const groupSize = teacherNumber("groupSize");
      if (validFraction(numerator, denominator) && denominator <= 6 && groupSize >= 1 && groupSize <= 5) {
        question = {
          numerator, denominator, groupSize,
          total: denominator * groupSize,
          expected: numerator,
          icon: state.question.icon || pick(objectIcons),
          custom: true
        };
      }
    } else if (state.mode === "pizza") {
      const numerator = teacherNumber("numerator");
      const denominator = teacherNumber("denominator");
      if (validFraction(numerator, denominator) && denominator <= 10) {
        question = { numerator, denominator, expected: numerator, custom: true };
      }
    } else if (state.mode === "equivalent") {
      const numerator = teacherNumber("numerator");
      const denominator = teacherNumber("denominator");
      const multiplier = teacherNumber("multiplier");
      if (validFraction(numerator, denominator) && denominator <= 6 && multiplier >= 2 && multiplier <= 3 && denominator * multiplier <= 12) {
        question = {
          numerator, denominator,
          equivalentNumerator: numerator * multiplier,
          equivalentDenominator: denominator * multiplier,
          expected: numerator * multiplier,
          custom: true
        };
      }
    } else if (state.mode === "mixed") {
      const whole = teacherNumber("whole");
      const remainder = teacherNumber("remainder");
      const denominator = teacherNumber("denominator");
      const direction = document.getElementById("teacher-direction").value;
      if (whole >= 1 && whole <= 3 && validFraction(remainder, denominator) && denominator <= 8) {
        question = {
          whole, remainder, denominator, direction,
          improperNumerator: whole * denominator + remainder,
          unitCount: whole + 1,
          expected: whole * denominator + remainder,
          custom: true
        };
      }
    } else {
      const count = teacherNumber("count");
      const representation = document.getElementById("teacher-representation").value;
      if (Number.isInteger(count) && count >= 0 && count <= 100 && ["fraction", "decimal", "percent"].includes(representation)) {
        question = { count, representation, expected: count, custom: true };
      }
    }

    if (!question) {
      teacherError.textContent = t().teacherInvalid;
      playError();
      return;
    }

    state.question = question;
    state.selectedIndices = new Set();
    state.selectedCount = 0;
    state.solved = false;
    teacherDialog.close();
    playMove();
    renderQuestion();
  }

  function validFraction(numerator, denominator) {
    return Number.isInteger(numerator) && Number.isInteger(denominator)
      && numerator >= 1 && denominator >= 2 && numerator < denominator;
  }

  function renderQuestion() {
    applyTranslations();
    renderChallenge();
    renderStage();
    if (state.solved) setFeedback(makeSuccessMessage(), "success", true);
    else setFeedback(t().ready[state.mode]);
    updateCheckButton();
    refreshOperationGuideSteps();
  }

  function renderChallenge() {
    challengeDisplay.replaceChildren();
    const wrapper = document.createElement("div");
    const label = document.createElement("div");
    const value = document.createElement("div");
    label.className = "challenge-label";
    value.className = "challenge-value";
    label.textContent = t().challengeLabels[state.mode];

    if (state.mode === "set") {
      value.innerHTML = `${fractionMarkup(state.question.numerator, state.question.denominator)} <span>${formatTemplate(t().ofObjects, { total: state.question.total })}</span>`;
    } else if (state.mode === "pizza") {
      value.innerHTML = fractionMarkup(state.question.numerator, state.question.denominator);
    } else if (state.mode === "equivalent") {
      value.innerHTML = `${fractionMarkup(state.question.numerator, state.question.denominator)} <span>=</span> ${fractionMarkup("?", state.question.equivalentDenominator)}`;
    } else if (state.mode === "mixed") {
      value.innerHTML = state.question.direction === "improper"
        ? fractionMarkup(state.question.improperNumerator, state.question.denominator)
        : mixedMarkup(state.question.whole, state.question.remainder, state.question.denominator);
    } else if (state.question.representation === "fraction") {
      value.innerHTML = fractionMarkup(state.question.count, 100);
    } else if (state.question.representation === "decimal") {
      value.textContent = decimalFor(state.question.count);
    } else {
      value.textContent = `${state.question.count}%`;
    }

    wrapper.append(label, value);
    challengeDisplay.append(wrapper);
  }

  function renderStage() {
    conceptStage.replaceChildren();
    if (state.mode === "set") renderSetActivity();
    else if (state.mode === "pizza") renderPizzaActivity();
    else if (state.mode === "equivalent") renderEquivalentActivity();
    else if (state.mode === "mixed") renderMixedActivity();
    else renderHundredActivity();
  }

  function renderSetActivity() {
    const activity = document.createElement("div");
    const grid = document.createElement("div");
    const readout = document.createElement("div");
    activity.className = "set-activity";
    grid.className = "grouped-set";
    readout.className = "selection-readout";

    const groupCount = state.question.denominator;
    grid.dataset.groupCount = String(groupCount);
    grid.style.setProperty("--group-columns", Math.min(groupCount, 5));
    grid.style.setProperty("--group-columns-mobile", groupCount >= 5 ? 3 : groupCount);

    for (let groupIndex = 0; groupIndex < groupCount; groupIndex += 1) {
      const group = document.createElement("button");
      const objects = document.createElement("span");
      const label = document.createElement("span");
      group.type = "button";
      group.className = "object-group";
      group.dataset.objectCount = String(state.question.groupSize);
      objects.className = "group-objects";
      label.className = "group-number";
      objects.style.setProperty("--object-columns", String(state.question.groupSize === 4 ? 2 : Math.min(state.question.groupSize, 3)));
      objects.setAttribute("aria-hidden", "true");
      Array.from({ length: state.question.groupSize }, () => {
        const icon = document.createElement("span");
        icon.className = "group-object-icon";
        icon.textContent = state.question.icon;
        objects.append(icon);
      });
      label.textContent = formatTemplate(t().group, { number: groupIndex + 1 });
      group.setAttribute("aria-pressed", String(state.selectedIndices.has(groupIndex)));
      group.classList.toggle("is-selected", state.selectedIndices.has(groupIndex));
      group.addEventListener("click", () => toggleObject(groupIndex));
      group.append(objects, label);
      grid.append(group);
    }

    readout.textContent = formatTemplate(t().selectedGroups, {
      selected: state.selectedIndices.size,
      total: state.question.denominator,
      objects: state.selectedIndices.size * state.question.groupSize,
      objectTotal: state.question.total
    });
    activity.append(grid, readout);
    conceptStage.append(activity);
  }

  function toggleObject(index) {
    if (state.solved) return;
    if (state.selectedIndices.has(index)) state.selectedIndices.delete(index);
    else state.selectedIndices.add(index);
    playMove();
    setFeedback(t().ready[state.mode]);
    renderStage();
  }

  function renderPizzaActivity() {
    const activity = document.createElement("div");
    const board = document.createElement("div");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const guide = document.createElement("div");
    activity.className = "pizza-activity";
    board.className = "pizza-board";
    svg.classList.add("pizza-svg");
    svg.setAttribute("viewBox", "0 0 320 320");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${state.question.denominator} pizza slices`);
    guide.className = "pizza-guide";
    svg.append(createPizzaCrayonDefs());

    for (let index = 0; index < state.question.denominator; index += 1) {
      const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const startAngle = -90 + index * 360 / state.question.denominator;
      const endAngle = -90 + (index + 1) * 360 / state.question.denominator;
      slice.setAttribute("d", sectorPath(160, 160, 135, startAngle, endAngle));
      slice.classList.add("pizza-slice");
      slice.classList.toggle("is-selected", state.selectedIndices.has(index));
      slice.setAttribute("role", "button");
      slice.setAttribute("tabindex", "0");
      slice.setAttribute("aria-label", `${index + 1}/${state.question.denominator}`);
      slice.setAttribute("aria-pressed", String(state.selectedIndices.has(index)));
      slice.addEventListener("click", () => togglePizzaSlice(index));
      slice.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          togglePizzaSlice(index);
        }
      });
      svg.append(slice);
    }

    const toppingPositions = [[120, 105], [195, 102], [102, 175], [170, 155], [220, 190], [142, 225], [205, 238]];
    toppingPositions.forEach(([cx, cy]) => {
      const topping = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const highlight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      topping.setAttribute("cx", cx);
      topping.setAttribute("cy", cy);
      topping.setAttribute("r", "10");
      topping.classList.add("pizza-topping");
      highlight.setAttribute("cx", String(cx - 3));
      highlight.setAttribute("cy", String(cy - 3));
      highlight.setAttribute("r", "2.6");
      highlight.classList.add("pizza-topping-highlight");
      svg.append(topping, highlight);
    });

    const cheeseRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cheeseRing.setAttribute("cx", "160");
    cheeseRing.setAttribute("cy", "160");
    cheeseRing.setAttribute("r", "124");
    cheeseRing.classList.add("pizza-cheese-ring");
    const crust = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    crust.setAttribute("cx", "160");
    crust.setAttribute("cy", "160");
    crust.setAttribute("r", "135");
    crust.classList.add("pizza-crust");
    const crustColor = crust.cloneNode();
    crustColor.classList.add("pizza-crust-color");
    const crustWax = crust.cloneNode();
    crustWax.classList.add("pizza-crust-wax");
    svg.append(crust, crustColor, crustWax, cheeseRing);

    guide.innerHTML = `${fractionMarkup(state.selectedIndices.size, state.question.denominator)}<p>${formatTemplate(t().selectedSlices, {
      selected: state.selectedIndices.size,
      total: state.question.denominator
    })}</p>`;
    board.append(svg, guide);
    activity.append(board);
    conceptStage.append(activity);
  }

  function createPizzaCrayonDefs() {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <pattern id="pizza-crayon-cheese" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
        <rect width="18" height="18" fill="#fff0b8"></rect>
        <path d="M-3 3H21 M-3 9H21 M-3 15H21" stroke="#ffc129" stroke-width="2.4" stroke-linecap="round" opacity=".28"></path>
        <path d="M2 0V18 M12 0V18" stroke="#f5851f" stroke-width="1.2" stroke-linecap="round" opacity=".12"></path>
      </pattern>
      <pattern id="pizza-crayon-hover" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
        <rect width="18" height="18" fill="#ffd66f"></rect>
        <path d="M-3 3H21 M-3 9H21 M-3 15H21" stroke="#f5851f" stroke-width="2.8" stroke-linecap="round" opacity=".34"></path>
        <path d="M2 0V18 M12 0V18" stroke="#fff6cd" stroke-width="1.5" stroke-linecap="round" opacity=".35"></path>
      </pattern>
      <pattern id="pizza-crayon-selected" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
        <rect width="18" height="18" fill="#f5851f"></rect>
        <path d="M-3 3H21 M-3 9H21 M-3 15H21" stroke="#ffc129" stroke-width="3" stroke-linecap="round" opacity=".42"></path>
        <path d="M2 0V18 M12 0V18" stroke="#fff0b8" stroke-width="1.4" stroke-linecap="round" opacity=".2"></path>
      </pattern>
      <pattern id="pizza-crayon-topping" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
        <rect width="9" height="9" fill="#d6524a"></rect>
        <path d="M-2 2H11 M-2 7H11" stroke="#ef7868" stroke-width="2" stroke-linecap="round" opacity=".55"></path>
      </pattern>
      <filter id="pizza-crayon-wobble" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="17" result="noise"></feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="B"></feDisplacementMap>
      </filter>`;
    return defs;
  }

  function sectorPath(cx, cy, radius, startAngle, endAngle) {
    const start = polarPoint(cx, cy, radius, startAngle);
    const end = polarPoint(cx, cy, radius, endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  }

  function polarPoint(cx, cy, radius, angle) {
    const radians = angle * Math.PI / 180;
    return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
  }

  function togglePizzaSlice(index) {
    if (state.solved) return;
    if (state.selectedIndices.has(index)) state.selectedIndices.delete(index);
    else state.selectedIndices.add(index);
    playMove();
    setFeedback(t().ready[state.mode]);
    renderStage();
  }

  function renderEquivalentActivity() {
    const activity = document.createElement("div");
    const stack = document.createElement("div");
    const equal = document.createElement("div");
    const readout = document.createElement("div");
    activity.className = "equivalent-activity";
    stack.className = "bar-stack";
    equal.className = "equal-sign";
    equal.textContent = "=";
    readout.className = "bar-readout";

    stack.append(
      makeFractionBarRow(t().referenceBar, state.question.numerator, state.question.denominator, true),
      equal,
      makeFractionBarRow(t().yourBar, state.selectedIndices.size, state.question.equivalentDenominator, false)
    );

    readout.innerHTML = `${fractionMarkup(state.selectedIndices.size, state.question.equivalentDenominator)}`;
    activity.append(stack, readout);
    conceptStage.append(activity);
  }

  function makeFractionBarRow(labelText, numerator, denominator, reference) {
    const row = document.createElement("div");
    const label = document.createElement("div");
    const bar = document.createElement("div");
    row.className = "bar-row";
    label.className = "bar-label";
    bar.className = "fraction-bar";
    bar.style.setProperty("--segments", denominator);
    label.innerHTML = `<span>${labelText}</span>${fractionMarkup(numerator, denominator)}`;

    for (let index = 0; index < denominator; index += 1) {
      if (reference) {
        const segment = document.createElement("span");
        segment.className = "bar-segment";
        segment.classList.toggle("is-reference", index < numerator);
        bar.append(segment);
      } else {
        const segment = document.createElement("button");
        segment.type = "button";
        segment.className = "bar-segment";
        segment.classList.toggle("is-filled", state.selectedIndices.has(index));
        segment.setAttribute("aria-label", `${index + 1} / ${denominator}`);
        segment.setAttribute("aria-pressed", String(state.selectedIndices.has(index)));
        segment.addEventListener("click", () => setEquivalentCount(index));
        bar.append(segment);
      }
    }

    row.append(label, bar);
    return row;
  }

  function setEquivalentCount(index) {
    if (state.solved) return;
    const nextCount = state.selectedIndices.size === index + 1 ? index : index + 1;
    state.selectedIndices = new Set(Array.from({ length: nextCount }, (_, partIndex) => partIndex));
    playMove();
    setFeedback(t().ready[state.mode]);
    renderStage();
  }

  function renderMixedActivity() {
    const activity = document.createElement("div");
    const bars = document.createElement("div");
    const readout = document.createElement("div");
    activity.className = "mixed-activity";
    bars.className = "unit-bars";
    readout.className = "bar-readout";
    bars.style.setProperty("--unit-count", state.question.unitCount);

    for (let unit = 0; unit < state.question.unitCount; unit += 1) {
      const wrap = document.createElement("div");
      const label = document.createElement("div");
      const bar = document.createElement("div");
      wrap.className = "unit-wrap";
      label.className = "unit-label";
      bar.className = "unit-bar";
      bar.style.setProperty("--segments", state.question.denominator);
      label.textContent = formatTemplate(t().whole, { number: unit + 1 });

      for (let part = 0; part < state.question.denominator; part += 1) {
        const absoluteIndex = unit * state.question.denominator + part;
        const piece = document.createElement("button");
        piece.type = "button";
        piece.className = "unit-piece";
        piece.classList.toggle("is-filled", absoluteIndex < state.selectedCount);
        piece.setAttribute("aria-label", `${absoluteIndex + 1}`);
        piece.setAttribute("aria-pressed", String(absoluteIndex < state.selectedCount));
        piece.addEventListener("click", () => setMixedCount(absoluteIndex));
        bar.append(piece);
      }

      wrap.append(label, bar);
      bars.append(wrap);
    }

    readout.innerHTML = fractionMarkup(state.selectedCount, state.question.denominator);
    activity.append(bars, readout);
    conceptStage.append(activity);
  }

  function setMixedCount(index) {
    if (state.solved) return;
    state.selectedCount = state.selectedCount === index + 1 ? index : index + 1;
    playMove();
    setFeedback(t().ready[state.mode]);
    renderStage();
  }

  function renderHundredActivity() {
    const activity = document.createElement("div");
    const layout = document.createElement("div");
    const grid = document.createElement("div");
    const controls = document.createElement("div");
    const title = document.createElement("strong");
    const readout = document.createElement("div");
    const range = document.createElement("input");
    const rangeLabels = document.createElement("div");
    const buttons = document.createElement("div");
    activity.className = "hundred-activity";
    layout.className = "hundred-layout";
    grid.className = "hundred-grid";
    controls.className = "grid-controls";
    readout.className = "grid-readout";
    range.className = "grid-range";
    rangeLabels.className = "range-labels";
    buttons.className = "step-buttons";

    for (let index = 0; index < 100; index += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "hundred-cell";
      cell.classList.toggle("is-filled", index < state.selectedCount);
      cell.setAttribute("aria-label", `${index + 1} / 100`);
      cell.setAttribute("aria-pressed", String(index < state.selectedCount));
      cell.addEventListener("click", () => setHundredCount(index + 1));
      grid.append(cell);
    }

    title.textContent = t().selectedSquares;
    readout.innerHTML = fractionMarkup(state.selectedCount, 100);
    range.type = "range";
    range.min = "0";
    range.max = "100";
    range.step = "1";
    range.value = String(state.selectedCount);
    range.setAttribute("aria-label", t().selectedSquares);
    range.addEventListener("input", () => {
      if (state.solved) return;
      state.selectedCount = Number(range.value);
      playSoftTick();
      renderStage();
    });
    rangeLabels.innerHTML = "<span>0</span><span>50</span><span>100</span>";

    [
      [-10, t().minusTen],
      [-1, t().minusOne],
      [1, t().plusOne],
      [10, t().plusTen]
    ].forEach(([delta, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "step-button";
      button.textContent = label;
      button.addEventListener("click", () => adjustHundred(Number(delta)));
      buttons.append(button);
    });

    controls.append(title, readout, range, rangeLabels, buttons);
    layout.append(grid, controls);
    activity.append(layout);
    conceptStage.append(activity);
  }

  function setHundredCount(count) {
    if (state.solved) return;
    state.selectedCount = state.selectedCount === count ? Math.max(0, count - 1) : count;
    playMove();
    setFeedback(t().ready[state.mode]);
    renderStage();
  }

  function adjustHundred(delta) {
    if (state.solved) return;
    state.selectedCount = Math.max(0, Math.min(100, state.selectedCount + delta));
    playMove();
    setFeedback(t().ready[state.mode]);
    renderStage();
  }

  function resetActivity() {
    if (state.solved) {
      generateQuestion();
      return;
    }
    state.selectedIndices = new Set();
    state.selectedCount = 0;
    playClick();
    setFeedback(t().ready[state.mode]);
    renderStage();
  }

  function currentAnswer() {
    if (state.mode === "set" || state.mode === "pizza" || state.mode === "equivalent") return state.selectedIndices.size;
    return state.selectedCount;
  }

  function checkAnswer() {
    if (state.solved) {
      generateQuestion();
      return;
    }

    if (currentAnswer() === state.question.expected) {
      state.solved = true;
      setFeedback(makeSuccessMessage(), "success", true);
      celebrate();
      renderStage();
      updateCheckButton();
    } else {
      setFeedback(t().wrong[state.mode], "error");
      playError();
    }
  }

  function makeSuccessMessage() {
    const prefix = `<strong>${t().correct}</strong>`;
    let equation;

    if (state.mode === "set") {
      equation = `${fractionMarkup(state.question.numerator * state.question.groupSize, state.question.total)} <span>=</span> ${fractionMarkup(state.question.numerator, state.question.denominator)}`;
    } else if (state.mode === "pizza") {
      equation = fractionMarkup(state.question.numerator, state.question.denominator);
    } else if (state.mode === "equivalent") {
      equation = `${fractionMarkup(state.question.numerator, state.question.denominator)} <span>=</span> ${fractionMarkup(state.question.equivalentNumerator, state.question.equivalentDenominator)}`;
    } else if (state.mode === "mixed") {
      equation = `${fractionMarkup(state.question.improperNumerator, state.question.denominator)} <span>=</span> ${mixedMarkup(state.question.whole, state.question.remainder, state.question.denominator)}`;
    } else {
      equation = `${fractionMarkup(state.question.count, 100)} <span>=</span> <span>${decimalFor(state.question.count)}</span> <span>=</span> <span>${state.question.count}%</span>`;
    }

    return `${prefix}<span class="answer-equation">${equation}</span>`;
  }

  function setFeedback(message, type = "", allowHtml = false) {
    feedback.className = `feedback${type ? ` ${type}` : ""}`;
    if (allowHtml) feedback.innerHTML = message;
    else feedback.textContent = message;
  }

  function updateCheckButton() {
    checkBtn.querySelector("span:first-child").textContent = state.solved ? "→" : "✓";
    checkBtn.querySelector("span:last-child").textContent = state.solved ? t().next : t().check;
  }

  function celebrate() {
    const celebration = window.EdCloudCorrectCelebration;
    if (typeof celebration?.show !== "function") {
      playSuccess();
      return;
    }
    celebration.show({
      animation: "random",
      language: guideLanguage(),
      title: t().correct,
      message: t().prompts[state.mode],
      answerLabel: state.lang === "zh" ? "答案" : state.lang === "bm" ? "Jawapan" : "Answer",
      answerText: plainSuccessAnswer(),
      answerParts: successAnswerParts(),
      reviewText: state.lang === "zh" ? "再看一次" : state.lang === "bm" ? "Lihat semula" : "Review",
      nextText: t().next,
      soundEnabled: state.sound,
      onReview: () => conceptStage.focus({ preventScroll: true }),
      onNext: generateQuestion
    });
  }

  function plainSuccessAnswer() {
    if (state.mode === "set") {
      return `${state.question.numerator * state.question.groupSize}/${state.question.total} = ${state.question.numerator}/${state.question.denominator}`;
    }
    if (state.mode === "pizza") return `${state.question.numerator}/${state.question.denominator}`;
    if (state.mode === "equivalent") {
      return `${state.question.numerator}/${state.question.denominator} = ${state.question.equivalentNumerator}/${state.question.equivalentDenominator}`;
    }
    if (state.mode === "mixed") {
      return `${state.question.improperNumerator}/${state.question.denominator} = ${state.question.whole} ${state.question.remainder}/${state.question.denominator}`;
    }
    return `${state.question.count}/100 = ${decimalFor(state.question.count)} = ${state.question.count}%`;
  }

  function successAnswerParts() {
    const fraction = (numerator, denominator) => ({ type: "fraction", numerator, denominator });
    const equals = () => ({ type: "operator", text: "=" });
    const text = value => ({ type: "text", text: String(value) });

    if (state.mode === "set") {
      return [
        fraction(state.question.numerator * state.question.groupSize, state.question.total),
        equals(),
        fraction(state.question.numerator, state.question.denominator)
      ];
    }
    if (state.mode === "pizza") {
      return [fraction(state.question.numerator, state.question.denominator)];
    }
    if (state.mode === "equivalent") {
      return [
        fraction(state.question.numerator, state.question.denominator),
        equals(),
        fraction(state.question.equivalentNumerator, state.question.equivalentDenominator)
      ];
    }
    if (state.mode === "mixed") {
      return [
        fraction(state.question.improperNumerator, state.question.denominator),
        equals(),
        {
          type: "mixed",
          whole: state.question.whole,
          numerator: state.question.remainder,
          denominator: state.question.denominator
        }
      ];
    }
    return [
      fraction(state.question.count, 100),
      equals(),
      text(decimalFor(state.question.count)),
      equals(),
      text(`${state.question.count}%`)
    ];
  }

  function ensureAudioContext() {
    if (!state.sound) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  function playTone(frequency, duration, delay = 0, type = "sine", volume = .045) {
    const context = ensureAudioContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + delay;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + .02);
  }

  function playClick() { playTone(420, .06, 0, "sine", .025); }
  function playSoftTick() { playTone(330, .035, 0, "sine", .012); }
  function playMove() {
    playTone(360, .07, 0, "sine", .035);
    playTone(520, .08, .055, "sine", .03);
  }
  function playSuccess() {
    playTone(523, .14, 0, "sine", .05);
    playTone(659, .14, .1, "sine", .05);
    playTone(784, .2, .2, "sine", .055);
  }
  function playError() {
    playTone(210, .1, 0, "triangle", .035);
    playTone(165, .14, .09, "triangle", .03);
  }

  modeTabs.addEventListener("click", event => {
    const button = event.target.closest("[data-mode]");
    if (!button || activeGuideMode || button.dataset.mode === state.mode) return;
    state.mode = button.dataset.mode;
    document.querySelectorAll(".mode-tab").forEach(tab => {
      const active = tab === button;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    playClick();
    generateQuestion();
  });

  document.querySelectorAll(".language-btn").forEach(button => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      document.querySelectorAll(".language-btn").forEach(languageButton => {
        const active = languageButton === button;
        languageButton.classList.toggle("active", active);
        languageButton.setAttribute("aria-pressed", String(active));
      });
      playClick();
      renderQuestion();
      operationGuide?.setLanguage(guideLanguage());
    });
  });

  soundToggle.addEventListener("click", () => {
    state.sound = !state.sound;
    soundToggle.setAttribute("aria-pressed", String(state.sound));
    soundToggle.querySelector("span:last-child").textContent = state.sound ? t().soundOn : t().soundOff;
    soundIcon.src = state.sound ? "assets/ui-icons/sound-on.png" : "assets/ui-icons/sound-off.png";
    operationGuide?.setSoundEnabled(state.sound);
    if (state.sound) playClick();
  });

  fullscreenToggle.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (_) {
      // Fullscreen can be unavailable inside some embedded web views.
    }
    updateFullscreenButton();
  });
  document.addEventListener("fullscreenchange", updateFullscreenButton);

  teacherBtn.addEventListener("click", () => {
    playClick();
    openTeacherDialog();
  });
  teacherCloseBtn.addEventListener("click", () => teacherDialog.close());
  teacherCancelBtn.addEventListener("click", () => teacherDialog.close());
  teacherForm.addEventListener("submit", applyTeacherQuestion);
  teacherDialog.addEventListener("click", event => {
    if (event.target === teacherDialog) teacherDialog.close();
  });

  resetBtn.addEventListener("click", resetActivity);
  checkBtn.addEventListener("click", checkAnswer);
  newQuestionBtn.addEventListener("click", () => {
    playClick();
    generateQuestion();
  });

  generateQuestion();
  void initOperationGuide();
})();
