export function partition(iteration, initialData, data, pivot) {
    let array = initialData.map(a => Object.assign({}, a));
    let wrongArray = [];

    partitionImpl(array, 0, array.length - 1,pivot);
    let end = endSorting(array, data);


    for (let k = array.length; k--;) {
        if (array[k].value !== data[k].value) {
            wrongArray.push(array[k].id);
        }
    }
    console.log(array);
    console.log(wrongArray);
    return {
        result: !wrongArray.length,
        wrongArray: wrongArray,
        end: end
    };
}

function partitionImpl(arr, left, right,piv) {
    let i = left;
    let j = right;
    let pivot = arr.filter((e)=> e.id === piv)[0];
    let temp;

    while(i <= j){
        while (Number(arr[i].value) < Number(pivot.value)) i++;
        while (Number(arr[j].value) > Number(pivot.value)) j--;
        if (i <= j) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            console.log(arr[i]);
            console.log(arr);
            i++;
            j--;
        }
    }
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