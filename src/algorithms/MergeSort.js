export function mergeSort(iteration,initialData,data){
    let array = initialData.map(a => Object.assign({}, a));
    let wrongArray =[];



    for(let k = array.length; k--;) {
        if(array[k].value !== data[k].value){
            wrongArray.push(k);
        }
    }
    if(wrongArray.length >0){
        return {
            result: false,
            wrongArray: wrongArray
        };
    }else{
        return {
            result: true,
            wrongArray: []
        };
    }
}


function sort(arr){
    let n = arr.length;
    if (n <= 1) return arr;
    let a = [n/2];
    let b = [n - n/2];
    for (let i = 0; i <a.length ; i++) {
        a[i] = arr[i];
    }
    for (let j = 0; j <b.length ; j++) {
        b[j] = arr[j+n/2];
    }

    return merge(sort(a),sort(b));

}

function merge(a, b){

    let aux = [a.length+b.length];

    let i = 0, j = 0;
    for (let k = 0; k < aux.length; k++) {
        if      (i >= a.length) aux[k] = b[j++];
        else if (j >= b.length) aux[k] = a[i++];
        else if (a[i] <= b[j])  aux[k] = a[i++];
        else                    aux[k] = b[j++];
    }
    return aux;
}