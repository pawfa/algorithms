import {selectionSortChart} from "./SelectionSort";

export function insertionSort(iteration, initialData, data) {
    let array = initialData.map(a => Object.assign({}, a));
    let wrongArray = [];

    for (let i = 0; i < iteration; i++) {

        let j = i + 1;
        let current = array[j];

        while (j > 0 && Number(array[j - 1].value) > Number(array[j].value)) {
            array[j] = array[j - 1];
            array[j - 1] = current;
            j--;
            console.log(array);
        }
    }

    for (let k = array.length; k--;) {
        if (array[k].value !== data[k].value) {
            wrongArray.push(array[k].id);
        }
    }

    return {
        result: !wrongArray.length,
        wrongArray: wrongArray
    };
}

export function insertionSortChart(data, sendGraphData, i) {
    if (i === data.length)     {sendGraphData({
        chartArray: data,
        current: -1,
        iteration: -1
    }); return;}
    let callCount = i;
    let repeater = setInterval(function () {
        if (callCount > 0 && Number(data[callCount - 1].value) > Number(data[callCount].value)) {
            moveBar(data,sendGraphData,callCount,i);
            callCount--;
        }
        else {
            i++;
            insertionSortChart(data, sendGraphData, i);
            clearInterval(repeater);
        }
    }, 500)

}

function moveBar(data, sendGraphData,j,i) {
        let tmp = data[j];
        data[j] = data[j - 1];
        data[j - 1] = tmp;
    sendGraphData({
        chartArray: data,
        current: j-1,
        iteration: i
    });
}