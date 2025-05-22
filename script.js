HTML

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>เกมภาษาอังกฤษ-ญี่ปุ่น</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>เกมเรียนรู้ภาษา: อังกฤษ ↔ ญี่ปุ่น (คำตอบไทย)</h1>
        <div class="language-selector">
            <button id="lang-en" class="active">คำถามภาษาอังกฤษ</button>
            <button id="lang-jp">คำถามภาษาญี่ปุ่น</button>
        </div>
    </header>

    <main>
        <section id="game-area">
            <h2>เกมทายคำศัพท์</h2>
            <p id="question-text">คำถามจะปรากฏที่นี่</p>
            <div id="options-container">
                <button class="option-button">ตัวเลือก 1</button>
                <button class="option-button">ตัวเลือก 2</button>
                <button class="option-button">ตัวเลือก 3</button>
                <button class="option-button">ตัวเลือก 4</button>
            </div>
            <button id="next-button" class="hidden">คำถามถัดไป</button>
            <p id="feedback-text"></p>
        </section>

        <section id="score-area">
            <h2>คะแนน</h2>
            <p>ถูกต้อง: <span id="correct-score">0</span></p>
            <p>ผิด: <span id="wrong-score">0</span></p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 เกมภาษาอังกฤษ-ญี่ปุ่น โดย [ชื่อของคุณ]</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
2. style.css (จัดแต่งหน้าตา)
ไฟล์นี้ก็ไม่มีการเปลี่ยนแปลงเช่นกันครับ เพราะการจัดแต่งหน้าตาไม่ได้ขึ้นอยู่กับภาษาของคำถามหรือคำตอบ

CSS

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f7f6;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* ทำให้ footer อยู่ด้านล่างสุด */
}

header {
    background-color: #2c3e50;
    color: #fff;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

header h1 {
    margin-bottom: 10px;
}

.language-selector button {
    background-color: #34495e;
    color: #fff;
    border: none;
    padding: 8px 15px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.language-selector button:hover {
    background-color: #4a627a;
}

.language-selector button.active {
    background-color: #1abc9c;
    font-weight: bold;
}

main {
    flex-grow: 1; /* ทำให้ main ขยายเต็มพื้นที่ที่เหลือ */
    display: flex;
    flex-wrap: wrap; /* ให้ section ต่างๆ สามารถห่อขึ้นบรรทัดใหม่ได้ */
    justify-content: center;
    gap: 20px; /* ระยะห่างระหว่าง section */
    padding: 20px;
}

section {
    background-color: #fff;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    flex: 1; /* ทำให้ section ขยายเต็มพื้นที่ */
    min-width: 300px; /* กำหนดความกว้างขั้นต่ำ */
}

#game-area {
    text-align: center;
}

#question-text {
    font-size: 2em;
    margin-bottom: 25px;
    color: #2980b9;
    min-height: 50px; /* กำหนดขั้นต่ำเพื่อป้องกันการกระโดด */
    display: flex;
    align-items: center;
    justify-content: center;
}

#options-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* ปรับตามขนาดจอ */
    gap: 15px;
    margin-bottom: 20px;
}

.option-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 15px 25px;
    border-radius: 7px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
}

.option-button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.option-button:active {
    transform: translateY(0);
}

.option-button.correct {
    background-color: #27ae60; /* สีเขียวสำหรับคำตอบที่ถูกต้อง */
}

.option-button.wrong {
    background-color: #e74c3c; /* สีแดงสำหรับคำตอบที่ผิด */
}

#next-button {
    background-color: #f39c12;
    color: #fff;
    border: none;
    padding: 12px 25px;
    border-radius: 7px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
}

#next-button:hover {
    background-color: #e67e22;
}

#next-button.hidden {
    display: none; /* ซ่อนปุ่มนี้ตามค่าเริ่มต้น */
}

#feedback-text {
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 15px;
    min-height: 30px; /* กำหนดขั้นต่ำเพื่อป้องกันการกระโดด */
}

#feedback-text.correct-feedback {
    color: #27ae60;
}

#feedback-text.wrong-feedback {
    color: #e74c3c;
}

#score-area {
    text-align: center;
}

#score-area p {
    font-size: 1.1em;
    margin-bottom: 10px;
}

footer {
    
