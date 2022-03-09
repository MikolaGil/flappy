import { updateBird, setupBird, getBirdRect } from './bird.js';

document.addEventListener('keypress', handleStart, {once: true} );

let lastTime = 0;

function updateLoop(time){
    if(!lastTime) {
        lastTime = time;
        window.requestAnimationFrame(updateLoop);
        return;
    }

    const delta = time - lastTime;
    updateBird(delta);

    if(checkLose()) return handleLose()
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
}

function handleStart(){
    const title = document.querySelector("[data-title]");
    const subTitle = document.querySelector("[data-subtitle]");

    title.classList.add("hide");
    subTitle.classList.add("hide");

    setupBird();
    lastTime = 0;

    window.requestAnimationFrame(updateLoop)
}

function checkLose(){
    const birdRect = getBirdRect();

    const outerWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;

    return outerWorld;
}

function handleLose(){
    setTimeout(()=>{
        const title = document.querySelector("[data-title]");
        const subTitle = document.querySelector("[data-subtitle]");

        title.classList.remove("hide");
        subTitle.classList.remove("hide");
        subTitle.textContent= `${1} Pipes`;

        document.addEventListener('keypress', handleStart, {once: true} );
    }, 100)
}

