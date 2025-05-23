// --- ส่วนที่ 1: กำหนดข้อมูลเกมและตัวแปรหลัก ---
const questions = [
    // --- คำถามระดับง่าย (Easy) ---
    { en: "Hello", jp: "こんにちは", th: "สวัสดี", options_th: ["ลาก่อน", "ขอบคุณ", "สวัสดี", "ขอโทษ"], correct_th: "สวัสดี", difficulty: "easy" },
    { en: "Thank you", jp: "ありがとう", th: "ขอบคุณ", options_th: ["ขอโทษ", "โปรด", "ขอบคุณ", "ใช่"], correct_th: "ขอบคุณ", difficulty: "easy" },
    { en: "Goodbye", jp: "さようなら", th: "ลาก่อน", options_th: ["สวัสดี", "ลาก่อน", "ขอโทษนะครับ/คะ", "ไม่"], correct_th: "ลาก่อน", difficulty: "easy" },
    { en: "Water", jp: "水", th: "น้ำ", options_th: ["อาหาร", "น้ำ", "ไฟ", "อากาศ"], correct_th: "น้ำ", difficulty: "easy" },
    { en: "Cat", jp: "猫 (ねこ)", th: "แมว", options_th: ["สุนัข", "แมว", "นก", "ปลา"], correct_th: "แมว", difficulty: "easy" },

    // --- คำถามระดับปานกลาง (Medium) ---
    { en: "Elephant", jp: "象 (ぞう)", th: "ช้าง", options_th: ["สุนัข", "แมว", "ช้าง", "นก"], correct_th: "ช้าง", difficulty: "medium" },
    { en: "Beautiful", jp: "美しい (うつくしい)", th: "สวยงาม", options_th: ["น่าเกลียด", "รวดเร็ว", "สวยงาม", "ใหญ่"], correct_th: "สวยงาม", difficulty: "medium" },
    { en: "Library", jp: "図書館 (としょかん)", th: "ห้องสมุด", options_th: ["โรงเรียน", "บ้าน", "ร้านค้า", "ห้องสมุด"], correct_th: "ห้องสมุด", difficulty: "medium" },
    { en: "Hospital", jp: "病院 (びょういん)", th: "โรงพยาบาล", options_th: ["โรงเรียน", "ธนาคาร", "โรงพยาบาล", "ร้านอาหาร"], correct_th: "โรงพยาบาล", difficulty: "medium" },
    { en: "To eat", jp: "食べる (たべる)", th: "กิน", options_th: ["ดื่ม", "วิ่ง", "นอน", "กิน"], correct_th: "กิน", difficulty: "medium" },

    // --- คำถามระดับยาก (Hard) ---
    { en: "University", jp: "大学 (だいがく)", th: "มหาวิทยาลัย", options_th: ["โรงเรียน", "บ้าน", "ร้านค้า", "มหาวิทยาลัย"], correct_th: "มหาวิทยาลัย", difficulty: "hard" },
    { en: "Transportation", jp: "交通機関 (こうつうきかん)", th: "การขนส่ง", options_th: ["การสื่อสาร", "การเดินทาง", "การขนส่ง", "การเกษตร"], correct_th: "การขนส่ง", difficulty: "hard" },
    { en: "Approximately", jp: "およそ", th: "ประมาณ", options_th: ["แน่นอน", "อย่างแม่นยำ", "ประมาณ", "ทันที"], correct_th: "ประมาณ", difficulty: "hard" },
    { en: "Independence", jp: "独立 (どくりつ)", th: "อิสรภาพ", options_th: ["ความร่วมมือ", "ความเป็นทาส", "อิสรภาพ", "ความขัดแย้ง"], correct_th: "อิสรภาพ", difficulty: "hard" },
    { en: "Responsibility", jp: "責任 (せきにん)", th: "ความรับผิดชอบ", options_th: ["ความสุข", "ความประมาท", "ความรับผิดชอบ", "ความกล้าหาญ"], correct_th: "ความรับผิดชอบ", difficulty: "hard" }
];

const TIME_LIMIT_PER_QUESTION = 15; // จำกัดเวลาต่อคำถาม (วินาที)

let currentQuestionIndex = 0;
let correctScore = 0;
let wrongScore = 0;
let currentLanguage = 'en'; // 'en' สำหรับคำถามภาษาอังกฤษ, 'jp' สำหรับคำถามภาษาญี่ปุ่น
let selectedDifficulty = 'easy'; // ระดับความยากเริ่มต้น
let timerInterval;
let timeLeft = TIME_LIMIT_PER_QUESTION;
let currentQuestionSet = []; // ชุดคำถามที่ถูกกรองและสุ่มแล้วสำหรับรอบปัจจุบัน

// --- ส่วนที่ 2: อ้างอิง Element ใน HTML ---
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const langEnButton = document.getElementById('lang-en');
const langJpButton = document.getElementById('lang-jp');
const diffEasyBtn = document.getElementById('diff-easy');
const diffMediumBtn = document.getElementById('diff-medium');
const diffHardBtn = document.getElementById('diff-hard');
const startGameButton = document.getElementById('start-game-button');

const timerText = document.getElementById('timer-text');
const timeLeftSpan = document.getElementById('time-left');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback-text');
const nextButton = document.getElementById('next-button');
const correctScoreSpan = document.getElementById('correct-score');
const wrongScoreSpan = document.getElementById('wrong-score');

const finalCorrectScoreSpan = document.getElementById('final-correct-score');
const finalWrongScoreSpan = document.getElementById('final-wrong-score');
const finalMessageText = document.querySelector('.final-message');
const playAgainButton = document.getElementById('play-again-button');


// --- ส่วนที่ 3: ฟังก์ชันหลักของเกม ---

// ฟังก์ชันสำหรับสุ่มลำดับ Element ใน Array
function shuffleArray(array) {
    const newArray = [...array]; // สร้าง array ใหม่เพื่อไม่แก้ไข original array
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ฟังก์ชันสำหรับสลับหน้าจอ
function showScreen(screenId) {
    const screens = [startScreen, gameScreen, resultScreen];
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.remove('hidden');
        } else {
            screen.classList.add('hidden');
        }
    });
}

// ฟังก์ชันเตรียมเกม (เรียกเมื่อกดเริ่มเกม)
function prepareGame() {
    // กรองคำถามตามระดับความยากที่เลือก
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
    currentQuestionSet = shuffleArray(filteredQuestions); // สุ่มคำถามสำหรับรอบเกมนี้

    currentQuestionIndex = 0;
    correctScore = 0;
    wrongScore = 0;
    updateScores(); // อัปเดตคะแนนเป็น 0
    stopTimer(); // หยุด timer เก่า (ถ้ามี)
    feedbackText.textContent = ''; // ล้างข้อความ Feedback
    feedbackText.className = '';
}

// ฟังก์ชันสำหรับแสดงคำถาม
function displayQuestion() {
    feedbackText.textContent = '';
    feedbackText.className = '';
    nextButton.classList.add('hidden');
    optionsContainer.innerHTML = '';

    // หากไม่มีคำถามในชุดที่ถูกกรอง หรือคำถามหมด
    if (currentQuestionSet.length === 0 || currentQuestionIndex >= currentQuestionSet.length) {
        endGame();
        return;
    }

    const currentQuestion = currentQuestionSet[currentQuestionIndex];

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

    startTimer(); // เริ่มจับเวลาสำหรับคำถามใหม่
}

// ฟังก์ชันสำหรับตรวจสอบคำตอบ
function checkAnswer(selectedOption) {
    stopTimer(); // หยุดเวลาทันทีที่ตอบ

    const currentQuestion = currentQuestionSet[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_th;

    // ปิดใช้งานปุ่มตัวเลือกทั้งหมด
    document.querySelectorAll('.option-button').forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct'); // ทำเครื่องหมายปุ่มที่ถูกต้อง
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
                button.classList.add('wrong'); // ทำเครื่องหมายปุ่มที่ตอบผิด
            }
        });
    }
    updateScores();
    nextButton.classList.remove('hidden'); // แสดงปุ่ม "คำถามถัดไป"
}

// ฟังก์ชันสำหรับอัปเดตคะแนนบนหน้าจอเกม
function updateScores() {
    correctScoreSpan.textContent = correctScore;
    wrongScoreSpan.textContent = wrongScore;
}

// ฟังก์ชันสำหรับไปคำถามถัดไป
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion(); // จะตรวจสอบการจบเกมใน displayQuestion
}

// ฟังก์ชันสำหรับจับเวลา
function startTimer() {
    timeLeft = TIME_LIMIT_PER_QUESTION;
    timeLeftSpan.textContent = timeLeft;
    stopTimer(); // เคลียร์ timer เก่าก่อนเริ่มใหม่

    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            stopTimer();
            feedbackText.textContent = 'หมดเวลา!';
            feedbackText.classList.add('wrong-feedback');
            wrongScore++;
            updateScores();
            // ปิดใช้งานปุ่มตัวเลือกทั้งหมด
            document.querySelectorAll('.option-button').forEach(button => {
                button.disabled = true;
            });
            // แสดงคำตอบที่ถูกต้อง
            const currentQuestion = currentQuestionSet[currentQuestionIndex];
            if (currentQuestion) { // ตรวจสอบว่ามีคำถามปัจจุบัน
                const correctAnswer = currentQuestion.correct_th;
                document.querySelectorAll('.option-button').forEach(button => {
                    if (button.textContent === correctAnswer) {
                        button.classList.add('correct');
                    }
                });
            }
            nextButton.classList.remove('hidden'); // แสดงปุ่ม "คำถามถัดไป"
        }
    }, 1000); // อัปเดตทุก 1 วินาที
}

function stopTimer() {
    clearInterval(timerInterval);
}

// ฟังก์ชันจบเกมและแสดงผลลัพธ์
function endGame() {
    stopTimer(); // หยุดเวลา
    showScreen('result-screen'); // ไปยังหน้าสรุปผล

    finalCorrectScoreSpan.textContent = correctScore;
    finalWrongScoreSpan.textContent = wrongScore;

    let message = "";
    if (correctScore === currentQuestionSet.length) {
        message = "ยอดเยี่ยม! คุณตอบถูกหมดทุกข้อ!";
    } else if (correctScore > wrongScore) {
        message = "เยี่ยมมาก! คุณทำได้ดีกว่าครึ่ง!";
    } else if (correctScore === 0) {
        message = "ไม่เป็นไรนะ ลองเล่นใหม่ดูอีกที!";
    } else {
        message = "คุณทำได้ดี! ลองพยายามอีกครั้งนะ!";
    }
    finalMessageText.textContent = message;
}

// --- ส่วนที่ 6: การจัดการการตั้งค่า (ภาษาและความยาก) ---

function changeLanguage(lang) {
    currentLanguage = lang;
    langEnButton.classList.remove('active');
    langJpButton.classList.remove('active');
    if (lang === 'en') {
        langEnButton.classList.add('active');
    } else {
        langJpButton.classList.add('active');
    }
}

function setDifficulty(level) {
    selectedDifficulty = level;
    document.querySelectorAll('.difficulty-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`diff-${level}`).classList.add('active');
}

// --- ส่วนที่ 7: การจัดการ Flow ของหน้าจอและปุ่ม ---

function initializeGame() {
    showScreen('start-screen'); // แสดงหน้าจอเริ่มต้นเมื่อโหลดเว็บ
    // กำหนดค่าเริ่มต้นให้กับปุ่มที่ active (ถ้ายังไม่ได้กำหนดใน HTML)
    langEnButton.classList.add('active');
    diffEasyBtn.classList.add('active');
}

function startGameFlow() {
    prepareGame(); // เตรียมชุดคำถามและรีเซ็ตคะแนน
    showScreen('game-screen'); // แสดงหน้าจอเกม
    displayQuestion(); // เริ่มแสดงคำถามแรก
}

function playAgainFlow() {
    initializeGame(); // กลับไปหน้าจอเริ่มต้น
}


// --- ส่วนที่ 8: Event Listeners (การดักจับเหตุการณ์) ---
langEnButton.addEventListener('click', () => changeLanguage('en'));
langJpButton.addEventListener('click', () => changeLanguage('jp'));

diffEasyBtn.addEventListener('click', () => setDifficulty('easy'));
diffMediumBtn.addEventListener('click', () => setDifficulty('medium'));
diffHardBtn.addEventListener('click', () => setDifficulty('hard'));

startGameButton.addEventListener('click', startGameFlow);
nextButton.addEventListener('click', nextQuestion);
playAgainButton.addEventListener('click', playAgainFlow);


// --- ส่วนที่ 9: เริ่มต้นเกมเมื่อโหลดหน้าเว็บ ---
document.addEventListener('DOMContentLoaded', initializeGame);
