let userSeq = [];
let gameSeq = [];

let highScore = 0;
let started = false;
let level = 0;
let btns = ["red","green","purple","yellow"];

let h3 = document.querySelector("h3");
let p = document.querySelector("p");
let HS = document.createElement("h4");

document.addEventListener("keypress", function() {
    if (started == false) {
        started == true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300)
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 300)
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    gameFlash(randomBtn);
}

function checkColor(idx) {;
    if (userSeq[idx] === gameSeq[idx]){
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your score was <b>${level}<b> <br>Press any key to restart`;
        if (level > highScore) {
            highScore = level;
        }
        HS.innerText = `High Score: ${highScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout( function() {
            document.querySelector("body").style.backgroundColor = "black";
        }, 150)
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkColor(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress)
}

function reset() {
    started =  false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    p.append(HS);
}


