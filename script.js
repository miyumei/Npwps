// อัปเดตโครงสร้างข้อมูลคำถาม
const questions = [
    {
        en: "Hello",
        jp: "こんにちは",
        th: "สวัสดี",
        options_th: ["ลาก่อน", "ขอบคุณ", "สวัสดี", "ขอโทษ"],
        correct_th: "สวัสดี",
        difficulty: "easy" // เพิ่มระดับความยาก
    },
    {
        en: "Elephant",
        jp: "象 (ぞう)",
        th: "ช้าง",
        options_th: ["สุนัข", "แมว", "ช้าง", "นก"],
        correct_th: "ช้าง",
        difficulty: "medium" // ตัวอย่างคำศัพท์ยากขึ้น
    },
    {
        en: "University",
        jp: "大学 (だいがく)",
        th: "มหาวิทยาลัย",
        options_th: ["โรงเรียน", "บ้าน", "ร้านค้า", "มหาวิทยาลัย"],
        correct_th: "มหาวิทยาลัย",
        difficulty: "hard" // ตัวอย่างคำศัพท์ที่ซับซ้อน
    }
    // ... เพิ่มคำถามอื่นๆ พร้อมกำหนด difficulty
];

// ตัวแปรใหม่สำหรับระดับความยากที่เลือก
let selectedDifficulty = 'easy'; // ค่าเริ่มต้น

// --- UI สำหรับเลือกความยาก (ต้องเพิ่มใน index.html ด้วย) ---
// สมมติว่าคุณมีปุ่มใน HTML: <button id="diff-easy">ง่าย</button> <button id="diff-medium">ปานกลาง</button> ...
const diffEasyBtn = document.getElementById('diff-easy');
const diffMediumBtn = document.getElementById('diff-medium');
const diffHardBtn = document.getElementById('diff-hard');

diffEasyBtn.addEventListener('click', () => setDifficulty('easy'));
diffMediumBtn.addEventListener('click', () => setDifficulty('medium'));
diffHardBtn.addEventListener('click', () => setDifficulty('hard'));

function setDifficulty(level) {
    selectedDifficulty = level;
    // อัปเดต UI ให้ปุ่มที่เลือก active
    document.querySelectorAll('.difficulty-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`diff-${level}`).classList.add('active');

    // รีเซ็ตเกมและแสดงคำถามใหม่ตามระดับความยาก
    currentQuestionIndex = 0;
    correctScore = 0;
    wrongScore = 0;
    updateScores();
    displayQuestion();
}

// --- ปรับปรุง displayQuestion() ---
function displayQuestion() {
    // ... โค้ดเดิม ...

    // กรองคำถามตามระดับความยากที่เลือก
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);

    // หากคำถามหมดสำหรับระดับนี้ หรือไม่มีคำถาม
    if (filteredQuestions.length === 0) {
        questionText.textContent = "ไม่มีคำถามสำหรับระดับนี้ กรุณาเลือกระดับอื่น.";
        optionsContainer.innerHTML = ''; // ลบปุ่มตัวเลือก
        nextButton.classList.add('hidden');
        return;
    }

    // สุ่มคำถามจาก filteredQuestions
    shuffleArray(filteredQuestions);
    const currentQuestion = filteredQuestions[currentQuestionIndex % filteredQuestions.length]; // ใช้ filteredQuestions.length

    // ... ส่วนที่เหลือของ displayQuestion() เหมือนเดิม แต่ใช้ currentQuestion ที่ถูกกรองแล้ว ...
}

// ปรับปรุง nextQuestion() เพื่อใช้ filteredQuestions ด้วย
function nextQuestion() {
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
    currentQuestionIndex = (currentQuestionIndex + 1); // ไม่ต้องใช้ % filteredQuestions.length ถ้าอยากให้จบเมื่อคำถามหมด
    // หากต้องการให้วนซ้ำ ให้ใช้: currentQuestionIndex = (currentQuestionIndex + 1) % filteredQuestions.length;

    // ถ้าคำถามหมดในระดับนี้ ให้แสดงข้อความ หรือรีเซ็ตเกม
    if (currentQuestionIndex >= filteredQuestions.length) {
        questionText.textContent = "จบเกมในระดับนี้แล้ว! คะแนนของคุณคือ...";
        optionsContainer.innerHTML = '';
        nextButton.classList.add('hidden');
        feedbackText.textContent = '';
        // อาจจะเพิ่มปุ่ม "เล่นใหม่" หรือ "เปลี่ยนระดับ"
        return;
    }

    displayQuestion();
                     }
