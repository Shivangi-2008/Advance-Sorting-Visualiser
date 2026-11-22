/*=========================================
            RADIX SORT
=========================================*/

const radixBtn = document.getElementById("radixBtn");

radixBtn.addEventListener("click", async () => {

    resetStats();

    setAlgorithm(
        "Radix Sort",
        "O(nk)",
        "O(nk)",
        "O(nk)",
        "O(n+k)",
        "Radix Sort sorts integers digit by digit starting from the least significant digit."
    );

    startTimer();

    const bars = document.querySelectorAll(".bar");

    let max = 0;

    for (let i = 0; i < bars.length; i++) {

        max = Math.max(max, parseInt(bars[i].style.height));

    }

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {

        await countingSort(bars, exp);

    }

    for (let i = 0; i < bars.length; i++) {

        bars[i].style.background = "#22c55e";

    }

    updateProgress(100, 100);

    stopTimer();
    showToast();

});

async function countingSort(bars, exp) {

    let output = new Array(bars.length);

    let count = new Array(10).fill(0);

    for (let i = 0; i < bars.length; i++) {

        const value = parseInt(bars[i].style.height);

        const index = Math.floor(value / exp) % 10;

        count[index]++;

        updateComparison();

    }

    for (let i = 1; i < 10; i++) {

        count[i] += count[i - 1];

    }

    for (let i = bars.length - 1; i >= 0; i--) {

        const value = parseInt(bars[i].style.height);

        const index = Math.floor(value / exp) % 10;

        output[count[index] - 1] = value;

        count[index]--;

    }

    for (let i = 0; i < bars.length; i++) {

        bars[i].style.background = "#ef4444";

        playSound(150 + output[i]);

        await sleep(delay);

        bars[i].style.height = output[i] + "px";

        bars[i].style.background =
            "linear-gradient(to top,#2563eb,#60a5fa)";

        updateSwap();

        updateProgress(i + 1, bars.length);

    }

}