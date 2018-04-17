import {selectionSort} from '../algorithms/SelectionSort.js'

const initialState = {
    initialSeries:[],
    workingSeries: [],
    iteration: 1,
    algorithmType: '',
    correct: '',
    wrongArray: [],
    end: false
};
for(let i = 0; i < 10; i++){
    initialState.initialSeries.push({
        id:i,
        value:i
    });
    initialState.workingSeries.push({
        id:i,
        value:i
    });
}

const seriesReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'CHANGE_ALL_SERIES':
            return {
                ...state,
                initialSeries: action.payload,
                workingSeries: action.payload
            };
        case 'CHANGE_BLOCKS_ORDER':
            const [dragIndex,hoverIndex,dragNumber] = action.payload;
            const seriesTmp = state.workingSeries.slice();
            const tmp = dragNumber;
            seriesTmp[dragIndex] = seriesTmp[hoverIndex];
            seriesTmp[hoverIndex] = tmp;
            return { ...state, workingSeries: seriesTmp };
        case 'CHECK_SELECTIONSORT':
            console.log(state.iteration);
            let {result,wrongArray} = selectionSort(state.iteration,state.initialSeries,state.workingSeries);

            return {
                ...state,
                iteration: (result ? state.iteration+1 : state.iteration),
                correct: result,
                wrongArray: wrongArray,
                end: state.iteration === state.initialSeries.length-1
            };
        default:
            return state
    }

};

export default seriesReducer