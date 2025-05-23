// --- ส่วนที่ 1: กำหนดข้อมูลเกมและตัวแปรหลัก ---
const questions = [
    // --- คำถามระดับง่าย (Easy) ---
    { en: "Hello", jp: "こんにちは", th: "สวัสดี", options_th: ["ลาก่อน", "ขอบคุณ", "สวัสดี", "ขอโทษ"], correct_th: "สวัสดี", difficulty: "easy" },
    { en: "Thank you", jp: "ありがとう", th: "ขอบคุณ", options_th: ["ขอโทษ", "โปรด", "ขอบคุณ", "ใช่"], correct_th: "ขอบคุณ", difficulty: "easy" },
    { en: "Goodbye", jp: "さようなら", th: "ลาก่อน", options_th: ["สวัสดี", "ลาก่อน", "ขอโทษนะครับ/คะ", "ไม่"], correct_th: "ลาก่อน", difficulty: "easy" },
    { en: "Water", jp: "水", th: "น้ำ", options_th: ["อาหาร", "น้ำ", "ไฟ", "อากาศ"], correct_th: "น้ำ", difficulty: "easy" },
    { en: "Cat", jp: "猫 (ねこ)", th: "แมว", options_th: ["สุนัข", "แมว", "นก", "ปลา"], correct_th: "แมว", difficulty: "easy" },
    // **คำถาม Easy เพิ่มเติม**
    { en: "Dog", jp: "犬 (いぬ)", th: "สุนัข", options_th: ["สุนัข", "แมว", "กระต่าย", "ปลา"], correct_th: "สุนัข", difficulty: "easy" },
    { en: "Book", jp: "本 (ほん)", th: "หนังสือ", options_th: ["ปากกา", "หนังสือ", "ดินสอ", "กระดาษ"], correct_th: "หนังสือ", difficulty: "easy" },
    { en: "Car", jp: "車 (くるま)", th: "รถยนต์", options_th: ["จักรยาน", "เครื่องบิน", "เรือ", "รถยนต์"], correct_th: "รถยนต์", difficulty: "easy" },
    { en: "House", jp: "家 (いえ)", th: "บ้าน", options_th: ["โรงเรียน", "โรงพยาบาล", "บ้าน", "ร้านค้า"], correct_th: "บ้าน", difficulty: "easy" },
    { en: "Food", jp: "食べ物 (たべもの)", th: "อาหาร", options_th: ["น้ำ", "อาหาร", "เสื้อผ้า", "เงิน"], correct_th: "อาหาร", difficulty: "easy" },
    { en: "Yes", jp: "はい", th: "ใช่", options_th: ["ไม่", "บางที", "ใช่", "โปรด"], correct_th: "ใช่", difficulty: "easy" },
    { en: "No", jp: "いいえ", th: "ไม่", options_th: ["ใช่", "ขอบคุณ", "ไม่", "สวัสดี"], correct_th: "ไม่", difficulty: "easy" },
    { en: "Please", jp: "お願いします (おねがいします)", th: "โปรด", options_th: ["ขอบคุณ", "ขอโทษ", "โปรด", "ลาก่อน"], correct_th: "โปรด", difficulty: "easy" },
    { en: "Excuse me / Sorry", jp: "すみません", th: "ขอโทษครับ/ค่ะ", options_th: ["ขอบคุณครับ/ค่ะ", "สวัสดีครับ/ค่ะ", "ขอโทษครับ/ค่ะ", "ไม่เป็นไรครับ/ค่ะ"], correct_th: "ขอโทษครับ/ค่ะ", difficulty: "easy" },
    { en: "Morning", jp: "朝 (あさ)", th: "ตอนเช้า", options_th: ["ตอนบ่าย", "ตอนกลางคืน", "ตอนเช้า", "ตอนเย็น"], correct_th: "ตอนเช้า", difficulty: "easy" },

    // --- คำถามระดับปานกลาง (Medium) ---
    { en: "Elephant", jp: "象 (ぞう)", th: "ช้าง", options_th: ["สุนัข", "แมว", "ช้าง", "นก"], correct_th: "ช้าง", difficulty: "medium" },
    { en: "Beautiful", jp: "美しい (うつくしい)", th: "สวยงาม", options_th: ["น่าเกลียด", "รวดเร็ว", "สวยงาม", "ใหญ่"], correct_th: "สวยงาม", difficulty: "medium" },
    { en: "Library", jp: "図書館 (としょかん)", th: "ห้องสมุด", options_th: ["โรงเรียน", "บ้าน", "ร้านค้า", "ห้องสมุด"], correct_th: "ห้องสมุด", difficulty: "medium" },
    { en: "Hospital", jp: "病院 (びょういん)", th: "โรงพยาบาล", options_th: ["โรงเรียน", "ธนาคาร", "โรงพยาบาล", "ร้านอาหาร"], correct_th: "โรงพยาบาล", difficulty: "medium" },
    { en: "To eat", jp: "食べる (たべる)", th: "กิน", options_th: ["ดื่ม", "วิ่ง", "นอน", "กิน"], correct_th: "กิน", difficulty: "medium" },
    // **คำถาม Medium เพิ่มเติม**
    { en: "Train Station", jp: "駅 (えき)", th: "สถานีรถไฟ", options_th: ["สนามบิน", "ท่าเรือ", "สถานีรถไฟ", "ป้ายรถเมล์"], correct_th: "สถานีรถไฟ", difficulty: "medium" },
    { en: "Teacher", jp: "先生 (せんせい)", th: "ครู", options_th: ["นักเรียน", "แพทย์", "วิศวกร", "ครู"], correct_th: "ครู", difficulty: "medium" },
    { en: "Family", jp: "家族 (かぞく)", th: "ครอบครัว", options_th: ["เพื่อน", "เพื่อนร่วมงาน", "ครอบครัว", "คนแปลกหน้า"], correct_th: "ครอบครัว", difficulty: "medium" },
    { en: "To go", jp: "行く (いく)", th: "ไป", options_th: ["มา", "ไป", "อยู่", "นั่ง"], correct_th: "ไป", difficulty: "medium" },
    { en: "To see / To watch", jp: "見る (みる)", th: "ดู", options_th: ["ฟัง", "อ่าน", "เขียน", "ดู"], correct_th: "ดู", difficulty: "medium" },
    { en: "Hot (temperature)", jp: "暑い (あつい)", th: "ร้อน (อากาศ)", options_th: ["หนาว", "อุ่น", "ร้อน (อากาศ)", "เย็น"], correct_th: "ร้อน (อากาศ)", difficulty: "medium" },
    { en: "Cold (temperature)", jp: "寒い (さむい)", th: "หนาว (อากาศ)", options_th: ["ร้อน", "อุ่น", "หนาว (อากาศ)", "เย็น"], correct_th: "หนาว (อากาศ)", difficulty: "medium" },
    { en: "Delicious", jp: "美味しい (おいしい)", th: "อร่อย", options_th: ["ไม่อร่อย", "สวย", "สะอาด", "อร่อย"], correct_th: "อร่อย", difficulty: "medium" },
    { en: "Price", jp: "値段 (ねだん)", th: "ราคา", options_th: ["คุณภาพ", "ขนาด", "ราคา", "จำนวน"], correct_th: "ราคา", difficulty: "medium" },
    { en: "Holiday / Day off", jp: "休み (やすみ)", th: "วันหยุด", options_th: ["วันทำงาน", "วันหยุด", "เวลาว่าง", "วันลา"], correct_th: "วันหยุด", difficulty: "medium" },

    // --- คำถามระดับยาก (Hard) ---
    { en: "University", jp: "大学 (だいがく)", th: "มหาวิทยาลัย", options_th: ["โรงเรียน", "บ้าน", "ร้านค้า", "มหาวิทยาลัย"], correct_th: "มหาวิทยาลัย", difficulty: "hard" },
    { en: "Transportation", jp: "交通機関 (こうつうきかん)", th: "การขนส่ง", options_th: ["การสื่อสาร", "การเดินทาง", "การขนส่ง", "การเกษตร"], correct_th: "การขนส่ง", difficulty: "hard" },
    { en: "Approximately", jp: "およそ", th: "ประมาณ", options_th: ["แน่นอน", "อย่างแม่นยำ", "ประมาณ", "ทันที"], correct_th: "ประมาณ", difficulty: "hard" },
    { en: "Independence", jp: "独立 (どくりつ)", th: "อิสรภาพ", options_th: ["ความร่วมมือ", "ความเป็นทาส", "อิสรภาพ", "ความขัดแย้ง"], correct_th: "อิสรภาพ", difficulty: "hard" },
    { en: "Responsibility", jp: "責任 (せきにん)", th: "ความรับผิดชอบ", options_th: ["ความสุข", "ความประมาท", "ความรับผิดชอบ", "ความกล้าหาญ"], correct_th: "ความรับผิดชอบ", difficulty: "hard" },
    // **คำถาม Hard เพิ่มเติม**
    { en: "International", jp: "国際的な (こくさいてきな)", th: "ระหว่างประเทศ", options_th: ["ในประเทศ", "ท้องถิ่น", "ส่วนตัว", "ระหว่างประเทศ"], correct_th: "ระหว่างประเทศ", difficulty: "hard" },
    { en: "Environment", jp: "環境 (かんきょう)", th: "สิ่งแวดล้อม", options_th: ["เศรษฐกิจ", "สังคม", "การเมือง", "สิ่งแวดล้อม"], correct_th: "สิ่งแวดล้อม", difficulty: "hard" },
    { en: "Communication", jp: "コミュニケーション", th: "การสื่อสาร", options_th: ["การทำงาน", "การเรียนรู้", "การสื่อสาร", "การตัดสินใจ"], correct_th: "การสื่อสาร", difficulty: "hard" },
    { en: "Opportunity", jp: "機会 (きかい)", th: "โอกาส", options_th: ["ปัญหา", "อุปสรรค", "ความท้าทาย", "โอกาส"], correct_th: "โอกาส", difficulty: "hard" },
    { en: "Experience", jp: "経験 (けいけん)", th: "ประสบการณ์", options_th: ["ความรู้", "ทักษะ", "ประสบการณ์", "ความสามารถ"], correct_th: "ประสบการณ์", difficulty: "hard" },
    { en: "Culture", jp: "文化 (ぶんか)", th: "วัฒนธรรม", options_th: ["ประวัติศาสตร์", "ภูมิศาสตร์", "สังคม", "วัฒนธรรม"], correct_th: "วัฒนธรรม", difficulty: "hard" },
    { en: "Technology", jp: "技術 (ぎじゅつ)", th: "เทคโนโลยี", options_th: ["วิทยาศาสตร์", "ศิลปะ", "เทคโนโลยี", "ธรรมชาติ"], correct_th: "เทคโนโลยี", difficulty: "hard" },
    { en: "Preparation", jp: "準備 (じゅんび)", th: "การเตรียมตัว", options_th: ["การเริ่มต้น", "การดำเนินการ", "การเตรียมตัว", "การสรุป"], correct_th: "การเตรียมตัว", difficulty: "hard" },
    { en: "Contribution", jp: "貢献 (こうけん)", th: "การมีส่วนร่วม", options_th: ["การถอนตัว", "การปฏิเสธ", "การมีส่วนร่วม", "การครอบครอง"], correct_th: "การมีส่วนร่วม", difficulty: "hard" },
    { en: "Cooperation", jp: "協力 (きょうりょく)", th: "ความร่วมมือ", options_th: ["การแข่งขัน", "ความขัดแย้ง", "ความร่วมมือ", "ความเป็นอิสระ"], correct_th: "ความร่วมมือ", difficulty: "hard" }
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
