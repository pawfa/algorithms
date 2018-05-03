export function partition(iteration, initialData, data, pivot) {
    let array = initialData.map(a => Object.assign({}, a));
    let wrongArray = [];

    partitionImpl(array, 0, array.length - 1,pivot);
    console.log(array);
    let end = endSorting(array, data);

    console.log(array);
    for (let k = array.length; k--;) {
        if (array[k].value !== data[k].value) {
            wrongArray.push(array[k].id);
        }
    }

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

function partitionImpl(arr, left, right,piv) {
    let i = left;
    let j = right;
    let pivot = arr.filter((e)=> e.id === piv);
    console.log(pivot);
    let temp;

    while(i <= j){
        while (Number(arr[i].value) < Number(pivot.value)) i++;
        while (Number(arr[j].value) > Number(pivot.value)) j--;
        if (i <= j) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
    console.log(i);
    return i;
}

function endSorting(completed, userInput) {
    for (let i = 0; i < completed.length; i++) {
        if (completed[i].id !== userInput[i].id) {
            return false;
        }
    }
    return true;
}