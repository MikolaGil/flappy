import { updateBird, setupBird, getBirdRect } from './bird.js';
import { updatePipes, setupPipes, getPassedPipes, getPipeRects } from './pipe.js';

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
    updatePipes(delta);

    if(checkLose()) return handleLose();

    lastTime = time;
    window.requestAnimationFrame(updateLoop);
}

function handleStart(){
    const title = document.querySelector("[data-title]");
    const subTitle = document.querySelector("[data-subtitle]");

    title.classList.add("hide");
    subTitle.classList.add("hide");

    setupBird();
    setupPipes();

    lastTime = 0;

    window.requestAnimationFrame(updateLoop)
}

function checkLose(){
    const birdRect = getBirdRect();
    const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect));

    const outerWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;

    return outerWorld || insidePipe;
}

function isCollision(rect1, rect2){
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function handleLose(){
    setTimeout(()=>{
        const title = document.querySelector("[data-title]");
        const subTitle = document.querySelector("[data-subtitle]");

        title.classList.remove("hide");
        subTitle.classList.remove("hide");
        subTitle.textContent= `${getPassedPipes()} Pipes`;

        document.addEventListener('keypress', handleStart, {once: true} );
    }, 100)
}

