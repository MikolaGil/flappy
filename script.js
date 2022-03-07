document.addEventListener('keypress', handleStart, {once: true} );

let lastTime;

function handleStart(){
    const title = document.querySelector("[data-title]");

    title.classList.add("hide");

    window.requestAnimationFrame(updateLoop)
}

function handleLose(){

}

function updateLoop(time){
    lastTime = time;
    
}