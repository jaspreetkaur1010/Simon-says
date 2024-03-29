let userSeq=[];
let gameSeq=[];
let started=false;
let level=0;
let h2=document.querySelector("h2");
let max=0;
btns=["red","blue","green","yellow"];

document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
    }
    levelUp();
});

function levelUp(){
    userSeq=[];  //after new level user reenters all btns
    level++;
    h2.innerText=`Level ${level}`;

    //random button chosen
    let randIdx= Math.floor(Math.random() * 4);
    let randColor= btns[randIdx];
    let randBtn= document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },400);
}

function checkAns(idx){
    
    if( userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if(level>max)
            max=level;
        h2.innerHTML=`Game Over! Your Score:<b>${level}<b> <br>
                    Top Score: <b>${max}</b><br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="rgb(142, 118, 90)";
        },150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    btnFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}