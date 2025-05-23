// --- ส่วนที่ 1: กำหนดข้อมูลเกมและตัวแปรหลัก ---
const questions = [
    {
        en: "Hello",
        jp: "こんにちは",
        th: "สวัสดี",
        options_th: ["ลาก่อน", "ขอบคุณ", "สวัสดี", "ขอโทษ"],
        correct_th: "สวัสดี",
        difficulty: "easy" // ระดับความยาก
    },
    {
        en: "Thank you",
        jp: "ありがとう",
        th: "ขอบคุณ",
        options_th: ["ขอโทษ", "โปรด", "ขอบคุณ", "ใช่"],
        correct_th: "ขอบคุณ",
        difficulty: "easy"
    },
    {
        en: "Goodbye",
        jp: "さようなら",
        th: "ลาก่อน",
        options_th: ["สวัสดี", "ลาก่อน", "ขอโทษนะครับ/คะ", "ไม่"],
        correct_th: "ลาก่อน",
        difficulty: "easy"
    },
    {
        en: "Water",
        jp: "水",
        th: "น้ำ",
        options_th: ["อาหาร", "น้ำ", "ไฟ", "อากาศ"],
        correct_th: "น้ำ",
        difficulty: "easy"
    },
    // --- คำถามระดับปานกลาง (Medium) ---
    {
        en: "Elephant",
        jp: "象 (ぞう)",
        th: "ช้าง",
        options_th: ["สุนัข", "แมว", "ช้าง", "นก"],
        correct_th: "ช้าง",
        difficulty: "medium"
    },
    {
        en: "Beautiful",
        jp: "美しい (うつくしい)",
        th: "สวยงาม",
        options_th: ["น่าเกลียด", "รวดเร็ว", "สวยงาม", "ใหญ่"],
        correct_th: "สวยงาม",
        difficulty: "medium"
    },
    {
        en: "Library",
        jp: "図書館 (としょかん)",
        th: "ห้องสมุด",
        options_th: ["โรงเรียน", "บ้าน", "ร้านค้า", "ห้องสมุด"],
        correct_th: "ห้องสมุด",
        difficulty: "medium"
    },
    // --- คำถามระดับยาก (Hard) ---
    {
        en: "University",
        jp: "大学 (だいがく)",
        th: "มหาวิทยาลัย",
        options_th: ["โรงเรียน", "บ้าน", "ร้านค้า", "มหาวิทยาลัย"],
        correct_th: "มหาวิทยาลัย",
        difficulty: "hard"
    },
    {
        en: "Transportation",
        jp: "交通機関 (こうつうきかん)",
        th: "การขนส่ง",
        options_th: ["การสื่อสาร", "การเดินทาง", "การขนส่ง", "การเกษตร"],
        correct_th: "การขนส่ง",
        difficulty: "hard"
    },
    {
        en: "Approximately",
        jp: "およそ",
        th: "ประมาณ",
        options_th: ["แน่นอน", "อย่างแม่นยำ", "ประมาณ", "ทันที"],
        correct_th: "ประมาณ",
        difficulty: "hard"
    }
];

let currentQuestionIndex = 0;
let correctScore = 0;
let wrongScore = 0;
let currentLanguage = 'en'; // 'en' สำหรับคำถามภาษาอังกฤษ, 'jp' สำหรับคำถามภาษาญี่ปุ่น
let selectedDifficulty = 'easy'; // ระดับความยากเริ่มต้น

// --- ส่วนที่ 2: อ้างอิง Element ใน HTML ---
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const feedbackText = document.getElementById('feedback-text');
const correctScoreSpan = document.getElementById('correct-score');
const wrongScoreSpan = document.getElementById('wrong-score');
const langEnButton = document.getElementById('lang-en');
const langJpButton = document.getElementById('lang-jp');

// อ้างอิงปุ่มเลือกระดับความยาก
const diffEasyBtn = document.getElementById('diff-easy');
const diffMediumBtn = document.getElementById('diff-medium');
const diffHardBtn = document.getElementById('diff-hard');

// --- ส่วนที่ 3: ฟังก์ชันหลักของเกม ---

// ฟังก์ชันสำหรับสุ่มลำดับ Element ใน Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ฟังก์ชันสำหรับแสดงคำถาม
function displayQuestion() {
    feedbackText.textContent = '';
    feedbackText.className = '';
    nextButton.classList.add('hidden');
    optionsContainer.innerHTML = ''; // ลบปุ่มตัวเลือกเดิมออกไปก่อน

    // กรองคำถามตามระดับความยากที่เลือก
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);

    // หากไม่มีคำถามในระดับที่เลือก หรือคำถามหมด
    if (filteredQuestions.length === 0) {
        questionText.textContent = "ไม่มีคำถามสำหรับระดับนี้ กรุณาเลือกระดับอื่น หรือเกมจบแล้ว!";
        optionsContainer.innerHTML = '';
        nextButton.classList.add('hidden');
        return;
    }

    // สุ่มลำดับคำถามที่ถูกกรองแล้ว
    shuffleArray(filteredQuestions);
    // ตรวจสอบว่า currentQuestionIndex ไม่เกินจำนวนคำถามที่มี
    const currentQuestion = filteredQuestions[currentQuestionIndex % filteredQuestions.length]; // ใช้ % เพื่อวนลูปคำถาม
                                                                                              // ถ้าต้องการให้จบเมื่อคำถามหมด ไม่ต้องใช้ %

    let questionContent;
    if (currentLanguage === 'en') {
        questionContent = currentQuestion.en;
    } else {
        questionContent = currentQuestion.jp;
    }

    questionText.textContent = questionContent;

    const optionsContent = shuffleArray([...currentQuestion.options_th]); // ตัวเลือกเป็นภาษาไทยเสมอ

    optionsContent.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

    document.querySelectorAll('.option-button').forEach(button => {
        button.disabled = false;
    });
}

// ฟังก์ชันสำหรับตรวจสอบคำตอบ (เหมือนเดิม)
function checkAnswer(selectedOption) {
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
    const currentQuestion = filteredQuestions[currentQuestionIndex % filteredQuestions.length]; // ใช้ % เพื่อวนลูป
    const correctAnswer = currentQuestion.correct_th;

    document.querySelectorAll('.option-button').forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });

    if (selectedOption === correctAnswer) {
        feedbackText.textContent = 'ถูกต้อง!';
        feedbackText.classList.add('correct-feedback');
        correctScore++;
    } else {
        feedbackText.textContent = 'ผิด! คำตอบที่ถูกต้องคือ: ' + correctAnswer;
        feedbackText.classList.add('wrong-feedback');
        wrongScore++;
        document.querySelectorAll('.option-button').forEach(button => {
            if (button.textContent === selectedOption) {
                button.classList.add('wrong');
            }
        });
    }
    updateScores();
    nextButton.classList.remove('hidden');
}

// ฟังก์ชันสำหรับอัปเดตคะแนน (เหมือนเดิม)
function updateScores() {
    correctScoreSpan.textContent = correctScore;
    wrongScoreSpan.textContent = wrongScore;
}

// ฟังก์ชันสำหรับไปคำถามถัดไป
function nextQuestion() {
    // เพิ่ม currentQuestionIndex
    currentQuestionIndex++;
    // หากต้องการให้เกมจบเมื่อคำถามในระดับหมด แทนที่จะวนลูป
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
    if (currentQuestionIndex >= filteredQuestions.length) {
        questionText.textContent = "จบเกมในระดับนี้แล้ว! คะแนนของคุณคือ...";
        optionsContainer.innerHTML = '';
        nextButton.classList.add('hidden');
        feedbackText.textContent = '';
        // อาจจะเพิ่มปุ่ม "เล่นใหม่" หรือ "เปลี่ยนระดับ" ตรงนี้
        return;
    }

    displayQuestion(); // แสดงคำถามถัดไป
}

// ฟังก์ชันสำหรับเปลี่ยนภาษา (เหมือนเดิม)
function changeLanguage(lang) {
    currentLanguage = lang;
    langEnButton.classList.remove('active');
    langJpButton.classList.remove('active');
    if (lang === 'en') {
        langEnButton.classList.add('active');
    } else {
        langJpButton.classList.add('active');
    }
    // รีเซ็ตเกมเมื่อเปลี่ยนภาษา
    currentQuestionIndex = 0;
    correctScore = 0;
    wrongScore = 0;
    updateScores();
    displayQuestion();
}

// ฟังก์ชันสำหรับตั้งค่าระดับความยาก
function setDifficulty(level) {
    selectedDifficulty = level;
    // อัปเดตสถานะปุ่ม active
    document.querySelectorAll('.difficulty-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`diff-${level}`).classList.add('active');

    // รีเซ็ตเกมและแสดงคำถามใหม่ตามระดับความยากที่เลือก
    currentQuestionIndex = 0;
    correctScore = 0;
    wrongScore = 0;
    updateScores();
    displayQuestion();
}

// --- ส่วนที่ 4: Event Listeners (การดักจับเหตุการณ์) ---
nextButton.addEventListener('click', nextQuestion);
langEnButton.addEventListener('click', () => changeLanguage('en'));
langJpButton.addEventListener('click', () => changeLanguage('jp'));

// Event Listeners สำหรับปุ่มเลือกระดับความยาก
diffEasyBtn.addEventListener('click', () => setDifficulty('easy'));
diffMediumBtn.addEventListener('click', () => setDifficulty('medium'));
diffHardBtn.addEventListener('click', () => setDifficulty('hard'));

// --- ส่วนที่ 5: เริ่มต้นเกมเมื่อโหลดหน้าเว็บ ---
document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();
    updateScores();
    // ตั้งค่าปุ่มความยากเริ่มต้นให้เป็น active
    document.getElementById('diff-easy').classList.add('active');
});
