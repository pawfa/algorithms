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


export function selectionSortChart(data,sendGraphData) {
    let array = data.map(a => Object.assign({}, a));

    let callCount = 0;
    let repeater = setInterval(function () {
        if (callCount < array.length) {

            let lowestIndex = callCount;

            for (let j = callCount + 1; j < array.length; j++) {
                sendGraphData({
                    chartArray: array,
                    current: j,
                    minIndex: lowestIndex
                });
                if (Number(array[j].value) < Number(array[lowestIndex].value)) {
                    lowestIndex = j;
                }
            }
            if (lowestIndex !== callCount) {
                let tmp = array[callCount];
                array[callCount] = array[lowestIndex];
                array[lowestIndex] = tmp;
            }
            // sendGraphData({
            //     chartArray: array,
            //     current: callCount,
            //     minIndex: lowestIndex
            // });
            callCount += 1;

        } else {
            clearInterval(repeater);
        }

    }, 1000);



    console.log(array);
    return array;
}