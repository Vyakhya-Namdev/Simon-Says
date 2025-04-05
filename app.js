let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');

document.addEventListener("keypress", function() {
    if(started == false){
        console.log("Game Started");
        started = true;

        levelUp();
    }
});

function levelUp(){
    userSeq =[];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn pressed -> game pressing button
    let randomIdx = Math.floor(Math.random()*4);
    let randomClr = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomClr}`);
    gameSeq.push(randomClr);
    console.log(gameSeq);
    btnFlash(randomBtn);
}

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

//user pressing btn
function btnPress(){
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let score = 0;
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp(), 1000);
        }
    }else{
        score = Math.max(score, level);
        h2.innerHTML = `Game Over! Your score was: <b>${level}</b> <br>Press any key to start...`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = "white";
        }, 100);
        reset();
    }
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}

let quit = document.querySelector(".quit");
quit.addEventListener("click", quitGame);

function quitGame() {
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "white";

    // Create video element
    let video = document.createElement("video");
    video.src = "congrats.mp4";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;

    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100vw";
    video.style.height = "100vh";
    video.style.objectFit = "cover";
    video.style.zIndex = "-1";

    document.body.appendChild(video); 
    let wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "0";
    wrapper.style.left = "0";
    wrapper.style.width = "100vw";
    wrapper.style.height = "100vh";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    wrapper.style.zIndex = "10";
    wrapper.style.color = "#000";
    wrapper.style.fontFamily = "Arial, sans-serif";

    let h1 = document.createElement("h1");
    h1.innerHTML = `🎉OOPS! You Quit <br>Your Highest Score: ${score}`;
    h1.style.fontSize = "3rem";
    h1.style.textAlign = "center";
    h1.style.color = "#111"; 
    h1.style.textShadow = "2px 2px 6px rgba(0,0,0,0.4";

    wrapper.appendChild(h1);
    document.body.appendChild(wrapper);
}