/*=========================================
            GLOBAL VARIABLES
=========================================*/

const container = document.getElementById("arrayContainer");

const sizeSlider = document.getElementById("sizeSlider");

const speedSlider = document.getElementById("speedSlider");

const newArrayBtn = document.getElementById("newArray");

let array = [];

let delay = 100;

/*=========================================
            SOUND
=========================================*/

let soundEnabled = true;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency = 300) {

    if (!soundEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 0.05);

}

/*=========================================
            STATISTICS
=========================================*/

let comparisons = 0;
let swaps = 0;

let startTime=0;

let timerInterval;

const algorithmName = document.getElementById("algorithmName");
const comparisonBox = document.getElementById("comparisons");
const swapBox = document.getElementById("swaps");
const timerBox = document.getElementById("time");
const progressBar = document.getElementById("progressBar");
const complexityBox = document.getElementById("complexity");

/*=========================================
        GENERATE RANDOM ARRAY
=========================================*/

function generateArray(size = 50){

    array = [];

    container.innerHTML = "";

    for(let i=0;i<size;i++){

        const value = Math.floor(Math.random()*450)+20;

        array.push(value);

        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = value+"px";

        bar.style.width = `${700/size}px`;

        container.appendChild(bar);

    }

}

/*=========================================
            DELAY
=========================================*/

function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

/*=========================================
        RESET STATISTICS
=========================================*/

function resetStats(){

    comparisons=0;

    swaps=0;

    comparisonBox.innerText=0;

    swapBox.innerText=0;

    timerBox.innerText="0 ms";

    progressBar.style.width="0%";

}

/*=========================================
            TIMER
=========================================*/

function startTimer(){

    startTime = performance.now();

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        const elapsed = performance.now() - startTime;

        timerBox.innerText = Math.floor(elapsed) + " ms";

    },100);

}

function stopTimer(){

    clearInterval(timerInterval);

}

/*=========================================
        UPDATE FUNCTIONS
=========================================*/

function updateComparison(){

    comparisons++;

    comparisonBox.innerText=comparisons;

}

function updateSwap(){

    swaps++;

    swapBox.innerText=swaps;

}

function updateProgress(current,total){

    progressBar.style.width=((current/total)*100)+"%";

}

/*=========================================
            EVENTS
=========================================*/

newArrayBtn.addEventListener("click",()=>{

    generateArray(Number(sizeSlider.value));

    resetStats();

});

sizeSlider.addEventListener("input",()=>{

    generateArray(Number(sizeSlider.value));

});

speedSlider.addEventListener("input",()=>{

    delay=201-Number(speedSlider.value);

});

/*=========================================
        ALGORITHM INFO
=========================================*/

function setAlgorithm(name,best,avg,worst,space,description){

    document.getElementById("algorithmName").innerText=name;

    document.getElementById("bestCase").innerText=best;

    document.getElementById("averageCase").innerText=avg;

    document.getElementById("worstCase").innerText=worst;

    document.getElementById("spaceCase").innerText=space;

    document.getElementById("algorithmDescription").innerText=description;

}

/*=========================================
            INITIAL ARRAY
=========================================*/

generateArray();

/*=========================================
        ANIMATION ENGINE
=========================================*/

let isPaused = false;

let stopSorting = false;

async function waitWhilePaused() {

    while (isPaused) {

        await sleep(50);

    }

}

async function compareBars(bar1, bar2) {

    await waitWhilePaused();

    bar1.style.background = "#ef4444";

    bar2.style.background = "#ef4444";

    await sleep(delay);

}

function resetBarColor(bar1, bar2) {

    bar1.style.background =
        "linear-gradient(to top,#2563eb,#60a5fa)";

    bar2.style.background =
        "linear-gradient(to top,#2563eb,#60a5fa)";

}

async function swapBars(bar1, bar2) {

    await waitWhilePaused();

    const h1 = bar1.style.height;

    bar1.style.height = bar2.style.height;

    bar2.style.height = h1;

    updateSwap();

    await sleep(delay);

}

/*=========================================
            BUTTON EVENTS
=========================================*/

const pauseBtn = document.getElementById("pauseBtn");

const resumeBtn = document.getElementById("resumeBtn");

const resetBtn = document.getElementById("resetBtn");

pauseBtn.onclick = () => {

    isPaused = true;

};

resumeBtn.onclick = () => {

    isPaused = false;

};

resetBtn.onclick = () => {

    location.reload();

};

/*=========================================
            THEME
=========================================*/

const themeBtn=document.getElementById("themeBtn");

let dark=true;

themeBtn.onclick=()=>{

    document.body.classList.toggle("light-theme");

    dark=!dark;

    if(dark){

        themeBtn.innerHTML="🌙 Dark Mode";

    }

    else{

        themeBtn.innerHTML="☀ Light Mode";

    }

}

/*=========================================
        CUSTOM ARRAY
=========================================*/

const customArrayInput =
document.getElementById("customArray");

const loadArrayBtn =
document.getElementById("loadArray");

loadArrayBtn.addEventListener("click", () => {

    const values = customArrayInput.value
        .split(",")
        .map(value => Number(value.trim()));

    if(values.some(isNaN) || values.length===0){

        alert("Please enter valid numbers separated by commas.");

        return;

    }

    createCustomArray(values);

});

function createCustomArray(values){

    array=[];

    container.innerHTML="";

    values.forEach(value=>{

        array.push(value);

        const bar=document.createElement("div");

        bar.classList.add("bar");

        bar.style.height=value+"px";

        bar.style.width=`${700/values.length}px`;

        container.appendChild(bar);

    });

}

/*=========================================
            SOUND BUTTON
=========================================*/

const soundBtn = document.getElementById("soundBtn");

soundBtn.addEventListener("click", () => {

    soundEnabled = !soundEnabled;

    if(soundEnabled){

        soundBtn.innerHTML="🔊 Sound";

    }

    else{

        soundBtn.innerHTML="🔇 Mute";

    }

});

/*=========================================
            TOAST
=========================================*/

const toast=document.getElementById("toast");

function showToast(){

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}