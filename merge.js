/*=========================================
            MERGE SORT
=========================================*/

const mergeBtn = document.getElementById("mergeBtn");

mergeBtn.addEventListener("click", async () => {

    resetStats();

    setAlgorithm(
        "Merge Sort",
        "O(n log n)",
        "O(n log n)",
        "O(n log n)",
        "O(n)",
        "Merge Sort recursively divides the array into halves and merges them back in sorted order."
    );

    startTimer();

    const bars = document.querySelectorAll(".bar");

    await mergeSort(bars, 0, bars.length - 1);

    for (let i = 0; i < bars.length; i++) {

        bars[i].style.background = "#22c55e";

    }

    updateProgress(100, 100);

    stopTimer();
    showToast();

});

async function mergeSort(bars, left, right){

    if(left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSort(bars, left, mid);

    await mergeSort(bars, mid + 1, right);

    await merge(bars, left, mid, right);

}

async function merge(bars, left, mid, right){

    let leftArray = [];
    let rightArray = [];

    for(let i = left; i <= mid; i++){

        leftArray.push(parseInt(bars[i].style.height));

    }

    for(let i = mid + 1; i <= right; i++){

        rightArray.push(parseInt(bars[i].style.height));

    }

    let i = 0;
    let j = 0;
    let k = left;

    while(i < leftArray.length && j < rightArray.length){

        updateComparison();

        await compareBars(bars[k], bars[k]);

        playSound(150 + leftArray[i]);

        if(leftArray[i] <= rightArray[j]){

            bars[k].style.height = leftArray[i] + "px";

            i++;

        }

        else{

            bars[k].style.height = rightArray[j] + "px";

            j++;

            updateSwap();

        }

        bars[k].style.background = "#f59e0b";

        await sleep(delay);

        bars[k].style.background =
        "linear-gradient(to top,#2563eb,#60a5fa)";

        k++;

    }

    while(i < leftArray.length){

        bars[k].style.height = leftArray[i] + "px";

        await sleep(delay);

        i++;
        k++;

    }

    while(j < rightArray.length){

        bars[k].style.height = rightArray[j] + "px";

        await sleep(delay);

        j++;
        k++;

    }

}