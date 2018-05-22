/**
 *
 * @param iteration
 * @param initialData
 * @param data
 * @param pivot
 * @returns {{result: boolean, wrongArray: Array, end: boolean}}
 */
export function partition(iteration, initialData, data, pivot) {
  let array = initialData.map((a) => Object.assign({}, a));
  let wrongArray = [];

  partitionImpl(array, 0, array.length - 1, pivot);
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
    end: end,
  };
}

/**
 *
 * @param arr
 * @param left
 * @param right
 * @param piv
 * @returns {*}
 */
function partitionImpl(arr, left, right, piv) {
  let i = left;
  let j = right;
  let pivot = arr.filter((e) => e.id === piv)[0];
  let temp;

  while (i <= j) {
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
  return i;
}

/**
 *
 * @param data
 * @param piv
 * @param sendGraphData
 */
export function partitionChart(data, sendGraphData, piv) {
  let arr = data.map((a) => Object.assign({}, a));
  let i = 0;
  let j = arr.length - 1;
  let pivot = arr.filter((e) => e.id === piv)[0];
  let pivIndex;
  let temp;

    while (i <= j) {
      while (Number(arr[i].value) < Number(pivot.value)) {
          i++;
      }
      while (Number(arr[j].value) > Number(pivot.value)) {
          j--;
      }
        if (i <= j) {
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          pivIndex = arr.map((e)=> e.id).indexOf(piv);
          sendGraphData({
            chartArray: arr,
            pivot: pivIndex,
          });
          i++;
          j--;

        }
    }
}

// export function partitionChart(data, sendGraphData, piv) {
//   let arr = data.map((a) => Object.assign({}, a));
//   let i = 0;
//   let j = arr.length - 1;
//   let pivot = arr.filter((e) => e.id === piv)[0];
//   let temp;
//   let count = 0;
//   let interval = setInterval(function() {
//     console.log(i, j);
//     if (i <= j) {
//       console.log(Number(arr[i].value) < Number(pivot.value));
//       setTimeout(function() {
//         if (Number(arr[i].value) < Number(pivot.value)) {
//           sendGraphData({
//             chartArray: arr,
//             currentLeft: i,
//             currentRight: j,
//           });
//           i++;
//           console.log(i);
//           console.log(arr[i]);
//         }
//       }, count * 500);
//       setTimeout(function() {
//         if (Number(arr[j].value) > Number(pivot.value)) {
//           sendGraphData({
//             chartArray: arr,
//             currentLeft: i,
//             currentRight: j,
//           });
//           j--;
//           console.log(arr[j]);
//         }
//       }, count * 500);
//
//       setTimeout(function() {
//         if (i <= j) {
//           temp = arr[i];
//           arr[i] = arr[j];
//           arr[j] = temp;
//           sendGraphData({
//             chartArray: arr,
//             currentLeft: i,
//             currentRight: j,
//           });
//           i++;
//           j--;
//         }
//       }, count * 500);
//     } else {
//       clearInterval(interval);
//     }
//   }, 2000);
// }

/**
 *
 * @param completed
 * @param userInput
 * @returns {boolean}
 */
function endSorting(completed, userInput) {
  for (let i = 0; i < completed.length; i++) {
    if (completed[i].id !== userInput[i].id) {
      return false;
    }
  }
  return true;
}
