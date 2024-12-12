let gameseq=[];
let userseq=[];

let btns = ["yellow","red","blue","green"];

let started = false;
let level = 0;

document.addEventListener("keypress",function(){
    if (started == false){
        console.log("Game started!");   
        started = true;

        levelUp();
    }
    
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userseq = [];
    level++;
    let h2 = document.querySelector("h2");
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); //selects the color and stores it

    gameseq.push(randColor);
    console.log(gameseq);

    btnFlash(randBtn);
}


function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for ( btn of allBtns) {
    btn.addEventListener("click",btnPress);

}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let h2 = document.querySelector("h2");
        h2.innerHTML = `Game over! Your score is <b>${level}</b> <br>Press any key to restart`;
        
        // Show the red flash overlay
        let flashOverlay = document.querySelector("#flash-overlay");
        flashOverlay.style.opacity = "1";
        setTimeout(function () {
            flashOverlay.style.opacity = "0"; // Fade out the flash
        }, 150);

        reset();
    }
}


function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;

}