import {selectionSort} from '../algorithms/SelectionSort.js'
import {insertionSort} from "../algorithms/InsertionSort";

const initialState = {
    initialSeries:[],
    workingSeries: [],
    iteration: 1,
    algorithmType: 'SELECTIONSORT',
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
                workingSeries: action.payload,
                iteration: 1,
                correct: '',
                wrongArray:[],
                end: false
            };
        case 'ALGORITHM_TYPE':
            console.log('reducer checking type');
            return {
                ...state,
                algorithmType: action.payload
            };
        case 'CHANGE_BLOCKS_ORDER':
            const [dragIndex,hoverIndex,dragNumber] = action.payload;
            const seriesTmp = state.workingSeries.slice();
            const tmp = dragNumber;
            seriesTmp[dragIndex] = seriesTmp[hoverIndex];
            seriesTmp[hoverIndex] = tmp;
            return { ...state, workingSeries: seriesTmp };
        case 'CHECK_ALGORITHM':

            switch(state.algorithmType){
                case 'SELECTIONSORT': {
                    console.log(state.iteration);
                    let {result, wrongArray} = selectionSort(state.iteration, state.initialSeries, state.workingSeries);

                    return {
                        ...state,
                        iteration: (result ? state.iteration + 1 : state.iteration),
                        correct: result,
                        wrongArray: wrongArray,
                        end: state.iteration === state.initialSeries.length - 1
                    };
                }
                case 'INSERTIONSORT': {
                    console.log('insertionsort');
                    let {result, wrongArray} = insertionSort(state.iteration, state.initialSeries, state.workingSeries);

                    return {
                        ...state,
                        iteration: (result ? state.iteration + 1 : state.iteration),
                        correct: result,
                        wrongArray: wrongArray,
                        end: state.iteration === state.initialSeries.length - 1
                    };
                }
                default:
                    return state;
            }

        default:
            return state;
    }

};

export default seriesReducer