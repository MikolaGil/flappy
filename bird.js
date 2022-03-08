
const BIRD_SPEED = 0.5;
let timeSinceLastJump = Number.POSITIVE_INFINITY;
const jumpDuration = 125;

export function setupBird(){
    setTop(window.innerHeight / 2);
    
    document.removeEventListener("keydown", handleJump);
    document.addEventListener("keydown", handleJump);
}

export function updateBird(delta){
    
    if(timeSinceLastJump < jumpDuration){
        setTop(getTop() - BIRD_SPEED * delta);
    } else{
        setTop(getTop() + BIRD_SPEED * delta);
    }

    timeSinceLastJump += delta;
}

export function getBirdRect(){
    const birdElem = document.querySelector("[data-bird]");

    return birdElem.getBoundingClientRect()
}

function setTop(top){
    const birdElem = document.querySelector("[data-bird]");

    birdElem.style.setProperty('--bird-top', top);
}

function getTop(){
    const birdElem = document.querySelector("[data-bird]");

    return parseFloat(getComputedStyle(birdElem).getPropertyValue('--bird-top'));
}

function handleJump(e){
    if(e.code !== "space") return;

    timeSinceLastJump = 0;
}