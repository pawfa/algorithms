let counter = 0;
let iterationArray = [];
let iter;
let dataGlobal;
let arrayGlobal;
let wrongArray = [];

export function mergeSort(iteration, initialData, data) {
    console.log(initialData);
    wrongArray = [];
    counter = 0;
    dataGlobal = data;
    arrayGlobal = initialData.map(a => Object.assign({}, a));


    iter = iteration;

    let completeArray = mergeSortImp(initialData);
    let end = endSorting(completeArray, data);

    if (wrongArray.length > 0) {
        return {
            result: false,
            wrongArray: wrongArray,
            end: end
        };
    } else {
        return {
            result: true,
            wrongArray: [],
            end: end
        };
    }
}

function mergeSortImp(arr) {
    if (arr.length === 1) {
        return arr
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(
        mergeSortImp(left),
        mergeSortImp(right),
        arr
    )
}

function merge(left, right, arr) {
    counter++;
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
        if (Number(left[indexLeft].value) < Number(right[indexRight].value)) {
            result.push(left[indexLeft]);
            indexLeft++
        } else {
            result.push(right[indexRight]);
            indexRight++
        }
    }

    if (iter === counter) {
        iterationArray = result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
        let minIndex = arrayGlobal.findIndex(x => x.id === arr[0].id);
        for (let k = 0; k < arr.length; k++) {
            let index = arrayGlobal.findIndex(x => x.id === arr[k].id);
            if (index < minIndex) {
                minIndex = index;
            }
        }

        for (let j = 0; j < iterationArray.length; j++) {
            arrayGlobal[minIndex] = iterationArray[j];
            if (arrayGlobal[minIndex].value !== dataGlobal[minIndex].value) {
                wrongArray.push(arrayGlobal[minIndex].id);
            }
            minIndex++;
        }
    }
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

function endSorting(completed, userInput) {
    for (let i = 0; i < completed.length; i++) {
        if (completed[i].id !== userInput[i].id) {
            return false;
        }
    }
    return true;
}