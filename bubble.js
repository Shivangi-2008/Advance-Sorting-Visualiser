/*=========================================
            BUBBLE SORT
=========================================*/

const bubbleBtn = document.getElementById("bubbleBtn");

bubbleBtn.addEventListener("click", bubbleSort);

async function bubbleSort() {

    resetStats();

    setAlgorithm(
        "Bubble Sort",
        "O(n)",
        "O(n²)",
        "O(n²)",
        "O(1)",
        "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order."
    );

    startTimer();

    const bars = document.querySelectorAll(".bar");

    const totalSteps = bars.length * bars.length;

    let progress = 0;

    for (let i = 0; i < bars.length - 1; i++) {

        for (let j = 0; j < bars.length - i - 1; j++) {

            progress++;

            updateProgress(progress, totalSteps);

            updateComparison();
const h1 = parseInt(bars[j].style.height);
const h2 = parseInt(bars[j + 1].style.height);

playSound(150 + h1);

await compareBars(bars[j], bars[j + 1]);

if (h1 > h2) {

    await swapBars(bars[j], bars[j + 1]);

}

resetBarColor(bars[j], bars[j + 1]);

        }

        bars[bars.length - i - 1].style.background = "#22c55e";

    }

    bars[0].style.background="#22c55e";

    for(let k=0;k<bars.length;k++){

       bars[k].style.animation="finish .6s ease";

   }

    updateProgress(totalSteps, totalSteps);

    stopTimer();
    showToast();

}