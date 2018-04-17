export const changeAllSeries = series => ({
    type: 'CHANGE_ALL_SERIES',
    payload: series
});

export const changeBlocksOrder = (dragIndex, hoverIndex,dragNumber) => ({
    type: 'CHANGE_BLOCKS_ORDER',
    payload: [dragIndex, hoverIndex,dragNumber]
});

export const checkCorrectness = (algorithmType) => ({
    type: 'CHECK_'+algorithmType.toUpperCase()
});