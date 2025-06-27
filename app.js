let gameseq = [];
let userseq = [];

let btns = ["yellow", "green", "red", "blue"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function gameflash(btn) {
    playSound(btn.id);
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    playSound(btn.id);
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    let randidx = Math.floor(Math.random() * 4);
    let rancolor = btns[randidx];
    let randbtn = document.querySelector(`.${rancolor}`);
    gameseq.push(rancolor);
    gameflash(randbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        playSound("wrong");
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>High Score: <b>${highScore}</b><br>Press any key to start.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
