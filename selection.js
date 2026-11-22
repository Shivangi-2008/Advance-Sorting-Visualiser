/*=========================================
            SELECTION SORT
=========================================*/

const selectionBtn = document.getElementById("selectionBtn");

selectionBtn.addEventListener("click", selectionSort);

async function selectionSort() {

    resetStats();

    setAlgorithm(
        "Selection Sort",
        "O(n²)",
        "O(n²)",
        "O(n²)",
        "O(1)",
        "Selection Sort repeatedly finds the minimum element and places it at the beginning of the unsorted part."
    );

    startTimer();

    const bars = document.querySelectorAll(".bar");

    const totalSteps = bars.length * bars.length;

    let progress = 0;

    for (let i = 0; i < bars.length; i++) {

        let minIndex = i;

        bars[minIndex].style.background = "#f59e0b";

        for (let j = i + 1; j < bars.length; j++) {

            progress++;

            updateProgress(progress, totalSteps);

            updateComparison();

            await compareBars(bars[minIndex], bars[j]);

            const h1 = parseInt(bars[minIndex].style.height);
            const h2 = parseInt(bars[j].style.height);

            playSound(150 + h2);

            if (h2 < h1) {

                bars[minIndex].style.background =
                    "linear-gradient(to top,#2563eb,#60a5fa)";

                minIndex = j;

                bars[minIndex].style.background = "#f59e0b";

            } else {

                resetBarColor(bars[minIndex], bars[j]);

                bars[minIndex].style.background = "#f59e0b";

            }

        }

        if (minIndex !== i) {

            await swapBars(bars[i], bars[minIndex]);

        }

        bars[minIndex].style.background =
            "linear-gradient(to top,#2563eb,#60a5fa)";

        bars[i].style.background = "#22c55e";

    }

    stopTimer();
    showToast();

}