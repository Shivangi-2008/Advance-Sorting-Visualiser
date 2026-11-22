/*=========================================
            SHELL SORT
=========================================*/

const shellBtn = document.getElementById("shellBtn");

shellBtn.addEventListener("click", async () => {

    resetStats();

    setAlgorithm(
        "Shell Sort",
        "O(n log n)",
        "O(n¹·⁵)",
        "O(n²)",
        "O(1)",
        "Shell Sort improves Insertion Sort by comparing elements that are far apart using a shrinking gap."
    );

    startTimer();

    const bars = document.querySelectorAll(".bar");

    let n = bars.length;

    let totalSteps = 0;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        totalSteps += n;
    }

    let progress = 0;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {

        for (let i = gap; i < n; i++) {

            let j = i;

            while (j >= gap) {

                progress++;
                updateProgress(progress, totalSteps);

                updateComparison();

                const current = parseInt(bars[j].style.height);
                const previous = parseInt(bars[j - gap].style.height);

                playSound(150 + current);

                await compareBars(bars[j - gap], bars[j]);

                if (previous > current) {

                    await swapBars(bars[j - gap], bars[j]);

                } else {

                    resetBarColor(bars[j - gap], bars[j]);
                    break;

                }

                resetBarColor(bars[j - gap], bars[j]);

                j -= gap;

            }

        }

    }

    for (let i = 0; i < n; i++) {

        bars[i].style.background = "#22c55e";

    }

    updateProgress(totalSteps, totalSteps);

    stopTimer();
    showToast();

});