let gameStatus = document.getElementById("gameStatus");
let gameSeq=[];
let userSeq=[];
let boxes=['red','yellow','green','blue'];

let started = false; 
let level = 0;
let highest = 0;

function boxFlash(box){
    box.classList.add("flash");
    setTimeout(function(){
        box.classList.remove("flash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    gameStatus.textContent=`Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    //console.log(randIdx);
    let randColor = boxes[randIdx];
    let randBox = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor)
    boxFlash(randBox);
}

document.addEventListener("keypress",function(){
    if(!started){
        console.log("Game is started");
        started=true;
        
        levelUp();
    }
});

function userBoxFlash(box){
    box.classList.add("user-flash");
    setTimeout(function(){
        box.classList.remove("user-flash");
    },200);
}

function checkResult(idx){
    console.log(userSeq);
    console.log(gameSeq);
    if(userSeq[idx]===gameSeq[idx]){  
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(level>highest){
            highest=level;
        }
        
        gameStatus.innerHTML=`Game Over! <br/> Your Highest Score is ${highest} <br/> Your Score is <b>${level}</> <br> Press any key to start.`;
        
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white';
        },200);
        started=false;
        gameSeq=[];
        userSeq=[];
        level=0;
    }
    
}

function boxPressed(){
    let box = this;
    userBoxFlash(box);
    userSeq.push(box.classList[1]);
    checkResult(userSeq.length-1);
}

let allBoxes = document.querySelectorAll(".box")

for (box of allBoxes){
    box.addEventListener("click",boxPressed);
}