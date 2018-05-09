export function selectionSort(iteration, initialData, data) {
    let array = initialData.map(a => Object.assign({}, a));
    let wrongArray = [];
    for (let i = 0; i < iteration; i++) {
        let lowestIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (Number(array[j].value) < Number(array[lowestIndex].value)) {
                lowestIndex = j;
            }
        }
        if (lowestIndex !== i) {
            let tmp = array[i];
            array[i] = array[lowestIndex];
            array[lowestIndex] = tmp;
        }
    }

    for (let k = array.length; k--;) {
        if (array[k].value !== data[k].value) {
            wrongArray.push(array[k].id);
        }
    }

    return {
        result: !wrongArray.length,
        wrongArray: wrongArray,
        chartArray: array
    };
}


export function selectionSortChart(data,sendGraphData,i) {
    if(i === data.length) return;
    let callCount = i;
    let lowestIndex = i;
        let repeater = setInterval(function () {
            if (callCount < data.length) {
                if (Number(data[callCount].value) < Number(data[lowestIndex].value)) {
                    lowestIndex = callCount;
                    sendGraphData({
                        chartArray: data,
                        current: callCount,
                        minIndex: lowestIndex,
                        iteration: i
                    });
                }
                sendGraphData({
                    chartArray: data,
                    current: callCount,
                    minIndex: lowestIndex,
                    iteration: i
                });
                callCount += 1;
            } else {
                let tmp = data[i];
                data[i] = data[lowestIndex];
                data[lowestIndex] = tmp;
                sendGraphData({
                    chartArray: data,
                    current: i,
                    minIndex: lowestIndex,
                    iteration: i
                });
                i++;
                setTimeout(function(){selectionSortChart(data,sendGraphData,i)}, 500);
                clearInterval(repeater);
            }

        }, 500);

}