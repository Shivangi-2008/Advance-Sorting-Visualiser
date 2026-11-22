/*=========================================
            HEAP SORT
=========================================*/

const heapBtn = document.getElementById("heapBtn");

heapBtn.addEventListener("click", async () => {

    resetStats();

    setAlgorithm(
        "Heap Sort",
        "O(n log n)",
        "O(n log n)",
        "O(n log n)",
        "O(1)",
        "Heap Sort builds a max heap and repeatedly moves the largest element to the end."
    );

    startTimer();

    const bars = document.querySelectorAll(".bar");

    let n = bars.length;

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {

        await heapify(bars, n, i);

    }

    // Extract Elements
    for (let i = n - 1; i > 0; i--) {

        await swapBars(bars[0], bars[i]);

        bars[i].style.background = "#22c55e";

        await heapify(bars, i, 0);

    }

    bars[0].style.background = "#22c55e";

    updateProgress(100,100);

    stopTimer();
    showToast();

});

async function heapify(bars, n, i){

    let largest = i;

    let left = 2*i + 1;

    let right = 2*i + 2;

    if(left < n){

        updateComparison();

        playSound(150 + parseInt(bars[left].style.height));

        await compareBars(bars[left], bars[largest]);

        if(parseInt(bars[left].style.height) >
           parseInt(bars[largest].style.height)){

            largest = left;

        }

        resetBarColor(bars[left], bars[i]);

    }

    if(right < n){

        updateComparison();

        playSound(150 + parseInt(bars[right].style.height));

        await compareBars(bars[right], bars[largest]);

        if(parseInt(bars[right].style.height) >
           parseInt(bars[largest].style.height)){

            largest = right;

        }

        resetBarColor(bars[right], bars[i]);

    }

    if(largest !== i){

        await swapBars(bars[i], bars[largest]);

        await heapify(bars, n, largest);

    }

}