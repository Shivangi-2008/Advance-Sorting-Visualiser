/*=========================================
            INSERTION SORT
=========================================*/

const insertionBtn = document.getElementById("insertionBtn");

insertionBtn.addEventListener("click", insertionSort);

async function insertionSort() {

    resetStats();

    setAlgorithm(
        "Insertion Sort",
        "O(n)",
        "O(n²)",
        "O(n²)",
        "O(1)",
        "Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position."
    );

    startTimer();

    const bars = document.querySelectorAll(".bar");

    const totalSteps = bars.length * bars.length;

    let progress = 0;

    for (let i = 1; i < bars.length; i++) {

        let j = i;

        while (j > 0) {

            progress++;

            updateProgress(progress, totalSteps);

            updateComparison();

            const currentHeight = parseInt(bars[j].style.height);
            const previousHeight = parseInt(bars[j - 1].style.height);

            playSound(150 + currentHeight);

            await compareBars(bars[j - 1], bars[j]);

            if (previousHeight > currentHeight) {

                await swapBars(bars[j - 1], bars[j]);

            } else {

                resetBarColor(bars[j - 1], bars[j]);
                break;

            }

            resetBarColor(bars[j - 1], bars[j]);

            j--;

        }

    }

    for (let i = 0; i < bars.length; i++) {

        bars[i].style.background = "#22c55e";

    }

    updateProgress(totalSteps, totalSteps);

    stopTimer();
    showToast();

}