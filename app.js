let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("game is started");
        //game will start once 
        started = true;

        levelUp();
    }
});


//for button flash so that we can see out button is clicked 
function gameFlash(btn){
    //add flash class in classList 
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250); //set time of 1/4 sec 
}

//user flash fuction
function userFlash(btn){
    //add flash class in classList 
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250); //set time of 1/4 sec 
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random button/Index choose from 0 to 3 
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); //. is string and randColor is a variable 
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    //console.log("curr level: ", level);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to  start.`;
        //adding color of whole body when game will over
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            //reset from red to white 
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();

    }
}

function btnPress() {
    let Button = this;
    userFlash(Button);

    //to get which color is used in button
    let userColor = Button.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

//access all buttons from html and css
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}