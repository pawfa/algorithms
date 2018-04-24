export function insertionSort(iteration,initialData,data){
    let array = initialData.map(a => Object.assign({}, a));
    let wrongArray =[];

    for (let i = 0; i < iteration; i++) {

        let j = i+1;
        let current = array[j];

        while(j > 0 && Number(array[j-1].value) > Number(array[j].value)){
            array[j] = array[j-1];
            array[j-1] = current;
            j--;
            console.log(array);
        }
    }

    for(let k = array.length; k--;) {
        if(array[k].value !== data[k].value){
            wrongArray.push(k);
        }
    }
    console.log(array);
    console.log(data);

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