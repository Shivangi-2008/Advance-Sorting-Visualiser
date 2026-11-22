/*=========================================
            QUICK SORT
=========================================*/

const quickBtn = document.getElementById("quickBtn");

quickBtn.addEventListener("click", async () => {

    resetStats();

    setAlgorithm(
        "Quick Sort",
        "O(n log n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)",
        "Quick Sort selects a pivot, partitions the array around it, and recursively sorts both partitions."
    );

    startTimer();

    const bars = document.querySelectorAll(".bar");

    await quickSort(bars, 0, bars.length - 1);

    for (let i = 0; i < bars.length; i++) {

        bars[i].style.background = "#22c55e";

    }

    updateProgress(100, 100);

    stopTimer();
    showToast();

});

async function quickSort(bars, low, high) {

    if (low < high) {

        const pivotIndex = await partition(bars, low, high);

        await quickSort(bars, low, pivotIndex - 1);

        await quickSort(bars, pivotIndex + 1, high);

    }

}

async function partition(bars, low, high) {

    let pivot = parseInt(bars[high].style.height);

    bars[high].style.background = "#f97316";

    let i = low - 1;

    for (let j = low; j < high; j++) {

        updateComparison();

        playSound(150 + parseInt(bars[j].style.height));

        await compareBars(bars[j], bars[high]);

        if (parseInt(bars[j].style.height) < pivot) {

            i++;

            await swapBars(bars[i], bars[j]);

        }

        resetBarColor(bars[j], bars[high]);

    }

    await swapBars(bars[i + 1], bars[high]);

    bars[i + 1].style.background = "#22c55e";

    return i + 1;

}