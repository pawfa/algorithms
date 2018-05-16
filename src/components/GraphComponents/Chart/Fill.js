/**
 *
 * @param chartData
 * @param data
 * @param i
 * @param algorithmType
 * @param colors
 * @returns {*}
 */
export default function fill(chartData, data, i, algorithmType, colors) {
  const {chartArray, current, minIndex, iteration, mergeArray} = chartData;
  switch (algorithmType) {
    case 'SELECTIONSORT':
      if (i === current && i !== minIndex) {
        return '#802CAB';
      }
      if (iteration >= 0 && iteration !== chartArray.length - 1 &&
          i === minIndex) {
        return '#F51E6E';
      }
      return colors(data);
    case 'INSERTIONSORT':
      if (iteration === i && iteration !== -1) {
        return '#802CAB';
      }
      if (i === current && iteration !== -1) {
        return '#F51E6E';
      }
      return colors(data);
    case 'MERGESORT':
      if (mergeArray.includes(i)) {
        return '#F51E6E';
      }
      return colors(data);
    default:
      return colors(data);
  }
}
