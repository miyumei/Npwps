// --- ส่วนที่ 1: กำหนดข้อมูลเกมและตัวแปรหลัก ---
const questions = [
    {
        en: "Hello",
        jp: "こんにちは",
        th: "สวัสดี", // เพิ่มคำแปลภาษาไทยของคำศัพท์
        options_th: ["ลาก่อน", "ขอบคุณ", "สวัสดี", "ขอโทษ"], // ตัวเลือกคำตอบเป็นภาษาไทย
        correct_th: "สวัสดี" // คำตอบที่ถูกต้องเป็นภาษาไทย
    },
    {
        en: "Thank you",
        jp: "ありがとう",
        th: "ขอบคุณ",
        options_th: ["ขอโทษ", "โปรด", "ขอบคุณ", "ใช่"],
        correct_th: "ขอบคุณ"
    },
    {
        en: "Goodbye",
        jp: "さようなら",
        th: "ลาก่อน",
        options_th: ["สวัสดี", "ลาก่อน", "ขอโทษนะครับ/คะ", "ไม่"],
        correct_th: "ลาก่อน"
    },
    {
        en: "Yes",
        jp: "はい",
        th: "ใช่",
        options_th: ["ไม่", "อาจจะ", "ใช่", "โปรด"],
        correct_th: "ใช่"
    },
    {
        en: "No",
        jp: "いいえ",
        th: "ไม่",
        options_th: ["ใช่", "ไม่", "ขอโทษ", "สวัสดี"],
        correct_th: "ไม่"
    },
    {
        en: "Please",
        jp: "お願いします",
        th: "โปรด",
        options_th: ["ขอบคุณ", "ขอโทษ", "ใช่", "โปรด"],
        correct_th: "โปรด"
    },
    {
        en: "Excuse me",
        jp: "すみません",
        th: "ขอโทษนะครับ/คะ",
        options_th: ["สวัสดี", "ลาก่อน", "ขอบคุณ", "ขอโทษนะครับ/คะ"],
        correct_th: "ขอโทษนะครับ/คะ"
    },
    {
        en: "Sorry",
        jp: "ごめんなさい",
        th: "ขอโทษ",
        options_th: ["ขอบคุณ", "สวัสดี", "ขอโทษ", "ใช่"],
        correct_th: "ขอโทษ"
    },
    {
        en: "Water",
        jp: "水",
        th: "น้ำ",
        options_th: ["อาหาร", "น้ำ", "ไฟ", "อากาศ"],
        correct_th: "น้ำ"
    },
    {
        en: "Food",
        jp: "食べ物",
        th: "อาหาร",
        options_th: ["น้ำ", "อาหาร", "บ้าน", "รถ"],
        correct_th: "อาหาร"
    }
];

let currentQuestionIndex = 0;
let correctScore = 0;
let wrongScore = 0;
let currentLanguage = 'en'; // 'en' สำหรับคำถามภาษาอังกฤษ, 'jp' สำหรับคำถามภาษาญี่ปุ่น

// --- ส่วนที่ 2: อ้างอิง Element ใน HTML ---
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const feedbackText = document.getElementById('feedback-text');
const correctScoreSpan = document.getElementById('correct-score');
const wrongScoreSpan = document.getElementById('wrong-score');
const langEnButton = document.getElementById('lang-en');
const langJpButton = document.getElementById('lang-jp');

// --- ส่วนที่ 3: ฟังก์ชันหลักของเกม ---

// ฟังก์ชันสำหรับสุ่มลำดับ Element ใน Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // แลกเปลี่ยนตำแหน่ง
    }
    return array;
}

// ฟังก์ชันสำหรับแสดงคำถาม
function displayQuestion() {
    feedbackText.textContent = ''; // ล้างข้อความ feedback
    feedbackText.className = ''; // ล้าง class สี
    nextButton.classList.add('hidden'); // ซ่อนปุ่ม "คำถามถัดไป"

    // ลบปุ่มตัวเลือกเดิมออกไปก่อน
    optionsContainer.innerHTML = '';

    // สุ่มลำดับคำถามเพื่อให้คำถามไม่ซ้ำกันในแต่ละรอบ
    shuffleArray(questions);

    // แสดงคำถามและตัวเลือก
    const currentQuestion = questions[currentQuestionIndex];
    let questionContent; // เนื้อหาคำถาม (จะเป็นภาษาอังกฤษหรือญี่ปุ่น)

    if (currentLanguage === 'en') {
        questionContent = currentQuestion.en; // คำถามเป็นภาษาอังกฤษ
    } else {
        questionContent = currentQuestion.jp; // คำถามเป็นภาษาญี่ปุ่น
    }

    questionText.textContent = questionContent;

    // ตัวเลือกคำตอบจะเป็นภาษาไทยเสมอ
    const optionsContent = shuffleArray([...currentQuestion.options_th]);

    optionsContent.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(option)); // เมื่อคลิกปุ่ม จะเรียก checkAnswer
        optionsContainer.appendChild(button);
    });

    // เปิดใช้งานปุ่มตัวเลือกทั้งหมด
    document.querySelectorAll('.option-button').forEach(button => {
        button.disabled = false;
    });
}

// ฟังก์ชันสำหรับตรวจสอบคำตอบ
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    // คำตอบที่ถูกต้องจะเป็นภาษาไทยเสมอ
    const correctAnswer = currentQuestion.correct_th;

    // ปิดใช้งานปุ่มตัวเลือกทั้งหมดหลังจากที่ผู้ใช้เลือกแล้ว
    document.querySelectorAll('.option-button').forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct'); // ทำเครื่องหมายปุ่มที่ถูกต้องด้วยสีเขียว
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
        // ทำเครื่องหมายปุ่มที่ผู้ใช้เลือกผิดด้วยสีแดง
        document.querySelectorAll('.option-button').forEach(button => {
            if (button.textContent === selectedOption) {
                button.classList.add('wrong');
            }
        });
    }
    updateScores(); // อัปเดตคะแนน
    nextButton.classList.remove('hidden'); // แสดงปุ่ม "คำถามถัดไป"
}

// ฟังก์ชันสำหรับอัปเดตคะแนน
function updateScores() {
    correctScoreSpan.textContent = correctScore;
    wrongScoreSpan.textContent = wrongScore;
}

// ฟังก์ชันสำหรับไปคำถามถัดไป
function nextQuestion() {
    // เลื่อนไปยังคำถามถัดไป หรือวนกลับไปคำถามแรกเมื่อถึงคำถามสุดท้าย
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    displayQuestion(); // แสดงคำถามใหม่
}

// ฟังก์ชันสำหรับเปลี่ยนภาษาของคำถาม
function changeLanguage(lang) {
    currentLanguage = lang;
    // อัปเดตสถานะปุ่มภาษา
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

// --- ส่วนที่ 4: Event Listeners (การดักจับเหตุการณ์) ---
nextButton.addEventListener('click', nextQuestion); // เมื่อคลิกปุ่ม "คำถามถัดไป"
langEnButton.addEventListener('click', () => changeLanguage('en')); // เมื่อคลิกปุ่ม "คำถามภาษาอังกฤษ"
langJpButton.addEventListener('click', () => changeLanguage('jp')); // เมื่อคลิกปุ่ม "คำถามภาษาญี่ปุ่น"

// --- ส่วนที่ 5: เริ่มต้นเกมเมื่อโหลดหน้าเว็บ ---
document.addEventListener('DOMContentLoaded', () => {
    displayQuestion(); // แสดงคำถามแรก
    updateScores(); // อัปเดตคะแนนเริ่มต้น
});
