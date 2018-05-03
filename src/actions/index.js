export const changeAllSeries = series => ({
    type: 'CHANGE_ALL_SERIES',
    payload: series
});

export const changeBlocksOrder = (dragIndex, hoverIndex,dragNumber) => ({
    type: 'CHANGE_BLOCKS_ORDER',
    payload: [dragIndex, hoverIndex,dragNumber]
});

export const checkCorrectness = () => ({
    type: 'CHECK_ALGORITHM'
});

export const setAlgorithmType = (algorithmType) => ({
    type: 'ALGORITHM_TYPE',
    payload: algorithmType
});

export const setPivot = (pivotId) => ({
    type: 'SET_PIVOT',
    payload: pivotId
});