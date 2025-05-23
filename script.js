// ... (ส่วนที่ 1: questions array และตัวแปรหลัก เหมือนเดิม) ...

// เพิ่มตัวแปรและอ้างอิงสำหรับจับเวลา
const TIME_LIMIT_PER_QUESTION = 15; // จำกัดเวลาต่อคำถาม (วินาที)
let timeLeft = TIME_LIMIT_PER_QUESTION;
let timerInterval;

// --- ส่วนที่ 2: อ้างอิง Element ใน HTML ---
// ... (อ้างอิง Element เดิม) ...

// อ้างอิง Element ใหม่
const startScreen = document.getElementById('start-screen');
const startGameButton = document.getElementById('start-game-button');
const gameContainer = document.getElementById('game-container'); // ส่วนที่ครอบคลุม game-area และ score-area
const timerText = document.getElementById('timer-text');
const timeLeftSpan = document.getElementById('time-left');


// --- ส่วนที่ 3: ฟังก์ชันหลักของเกม ---

// ... (shuffleArray ฟังก์ชันเหมือนเดิม) ...

// ฟังก์ชันสำหรับแสดงคำถาม
function displayQuestion() {
    feedbackText.textContent = '';
    feedbackText.className = '';
    nextButton.classList.add('hidden');
    optionsContainer.innerHTML = '';

    // กรองคำถามตามระดับความยากที่เลือก
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);

    // หากไม่มีคำถามในระดับที่เลือก
    if (filteredQuestions.length === 0) {
        questionText.textContent = "ไม่มีคำถามสำหรับระดับนี้ กรุณาเลือกระดับอื่น หรือเกมจบแล้ว!";
        optionsContainer.innerHTML = '';
        nextButton.classList.add('hidden');
        stopTimer(); // หยุดจับเวลา
        return;
    }

    // ตรวจสอบว่าคำถามหมดหรือไม่
    if (currentQuestionIndex >= filteredQuestions.length) {
        endGame(); // เรียกฟังก์ชันจบเกม
        return;
    }

    // สุ่มลำดับคำถามที่ถูกกรองแล้ว (แต่ใช้ currentQuestionIndex เพื่อไม่ให้ซ้ำ)
    // หรือถ้าอยากสุ่มทุกครั้งที่โหลดคำถามใหม่: shuffleArray(filteredQuestions);
    const currentQuestion = filteredQuestions[currentQuestionIndex];

    let questionContent;
    if (currentLanguage === 'en') {
        questionContent = currentQuestion.en;
    } else {
        questionContent = currentQuestion.jp;
    }

    questionText.textContent = questionContent;

    const optionsContent = shuffleArray([...currentQuestion.options_th]);

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

    // เริ่มจับเวลาสำหรับคำถามใหม่
    startTimer();
}

// ฟังก์ชันสำหรับตรวจสอบคำตอบ
function checkAnswer(selectedOption) {
    stopTimer(); // หยุดเวลาทันทีที่ตอบ

    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
    const currentQuestion = filteredQuestions[currentQuestionIndex]; // ไม่ต้องใช้ % เพราะเช็คที่ displayQuestion แล้ว

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
    nextButton.classList.remove('hidden'); // แสดงปุ่ม "คำถามถัดไป"
}

// ... (updateScores ฟังก์ชันเหมือนเดิม) ...

// ฟังก์ชันสำหรับไปคำถามถัดไป
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion(); // จะตรวจสอบการจบเกมใน displayQuestion
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
    resetGame(); // เรียก resetGame แทน
}

// ฟังก์ชันสำหรับตั้งค่าระดับความยาก
function setDifficulty(level) {
    selectedDifficulty = level;
    document.querySelectorAll('.difficulty-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`diff-${level}`).classList.add('active');

    // รีเซ็ตเกมเมื่อเปลี่ยนระดับความยาก
    resetGame(); // เรียก resetGame แทน
}

// --- ส่วนที่ 4: ฟังก์ชันสำหรับจับเวลา ---
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
            // แสดงคำตอบที่ถูกต้อง (ถ้ามี)
            const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
            if (filteredQuestions[currentQuestionIndex]) {
                const correctAnswer = filteredQuestions[currentQuestionIndex].correct_th;
                document.querySelectorAll('.option-button').forEach(button => {
                    if (button.textContent === correctAnswer) {
                        button.classList.add('correct');
                    }
                });
            }
            nextButton.classList.remove('hidden'); // แสดงปุ่ม "คำถามถัดไป"
        }
    }, 1000); // อัปเดตทุก 1 วินาที (1000 มิลลิวินาที)
}

function stopTimer() {
    clearInterval(timerInterval);
}

// --- ส่วนที่ 5: ฟังก์ชันควบคุมสถานะเกม ---

function resetGame() {
    currentQuestionIndex = 0;
    correctScore = 0;
    wrongScore = 0;
    updateScores();
    stopTimer(); // หยุดเวลา
    startScreen.classList.remove('hidden'); // แสดงหน้าจอเริ่มต้น
    gameContainer.classList.add('hidden'); // ซ่อนส่วนเกม
    feedbackText.textContent = ''; // ล้างข้อความ Feedback
    feedbackText.className = '';
    // ไม่ต้องเรียก displayQuestion ตรงนี้ เพราะจะถูกเรียกเมื่อกด Start Game
}

function startGame() {
    startScreen.classList.add('hidden'); // ซ่อนหน้าจอเริ่มต้น
    gameContainer.classList.remove('hidden'); // แสดงส่วนเกม
    displayQuestion(); // เริ่มแสดงคำถามแรก
}

function endGame() {
    stopTimer(); // หยุดเวลาเมื่อเกมจบ
    questionText.textContent = `จบเกมในระดับ ${selectedDifficulty} แล้ว!`;
    optionsContainer.innerHTML = '';
    feedbackText.textContent = `คะแนนของคุณ: ถูก ${correctScore} ผิด ${wrongScore}`;
    feedbackText.classList.remove('correct-feedback', 'wrong-feedback'); // ล้างสี
    feedbackText.classList.add('normal-feedback'); // หรือไม่มีก็ได้
    nextButton.classList.add('hidden'); // ซ่อนปุ่มถัดไป
    
    // เพิ่มปุ่มเล่นใหม่ หรือกลับหน้าจอเริ่มต้น
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = "เล่นใหม่";
    playAgainButton.classList.add('option-button'); // ใช้สไตล์เดียวกัน
    playAgainButton.style.marginTop = '20px';
    playAgainButton.addEventListener('click', resetGame);
    optionsContainer.appendChild(playAgainButton);
}


// --- ส่วนที่ 6: Event Listeners (การดักจับเหตุการณ์) ---
nextButton.addEventListener('click', nextQuestion);
langEnButton.addEventListener('click', () => changeLanguage('en'));
langJpButton.addEventListener('click', () => changeLanguage('jp'));

diffEasyBtn.addEventListener('click', () => setDifficulty('easy'));
diffMediumBtn.addEventListener('click', () => setDifficulty('medium'));
diffHardBtn.addEventListener('click', () => setDifficulty('hard'));

// Event Listener สำหรับปุ่ม "เริ่มเกม"
startGameButton.addEventListener('click', startGame);

// --- ส่วนที่ 7: เริ่มต้นเกมเมื่อโหลดหน้าเว็บ ---
document.addEventListener('DOMContentLoaded', () => {
    resetGame(); // เริ่มต้นด้วยการแสดงหน้าจอเริ่มต้น
});
