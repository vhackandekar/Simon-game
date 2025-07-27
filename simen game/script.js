let gameSeq = [];
let userSeq = [];
let levelNum = 0;
let gameStarted = false; // Add this flag
const colors = ["red", "green", "blue", "yellow"];
const levelText = document.querySelector('h3');

document.addEventListener('keypress', function () {
    if (!gameStarted) { // Only start if not already running
        levelNum = 0;
        gameSeq = [];
        userSeq = [];
        gameStarted = true;
        levelText.innerText = "Game Started";
        nextSequence();
    }
});

function nextSequence() {
    userSeq = [];
    levelNum++;
    levelText.innerText = `Level ${levelNum}`;
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSeq.push(randomColor);
    let colorBox = document.querySelector(`.${randomColor}`);
    colorBox.classList.add("active");
    setTimeout(function () {
        colorBox.classList.remove("active");
    }, 1000);
}

document.querySelectorAll('.box').forEach(function (box) {
    box.addEventListener('click', function () {
        if (!gameStarted) return; // Ignore clicks if game not started
        let userColor = this.classList[1];
        userSeq.push(userColor);
        this.classList.add("active");
        setTimeout(() => {
            this.classList.remove("active");
        }, 1000);
        checkAnswer(userSeq.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (gameSeq[currentLevel] === userSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(function () {
                nextSequence();
            }, 600);
        }
    } else {
        levelText.innerText = "Wrong! Game Over";
        let body = document.querySelector('body');
        body.classList.add("disable");
        setTimeout(function () {
            body.classList.remove("disable");
        }, 1000);
        gameSeq = [];
        userSeq = [];
        levelNum = 0; // Reset levelNum
        gameStarted = false; // Allow restart
        setTimeout(function () {
            levelText.innerText = "Press any key to start again";
        }, 2000);
    }
}
