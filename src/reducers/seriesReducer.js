import {selectionSort} from '../algorithms/SelectionSort.js'
import {insertionSort} from "../algorithms/InsertionSort";
import {mergeSort} from "../algorithms/MergeSort";
import {partition} from "../algorithms/Partition";

const initialState = {
    initialSeries:[],
    workingSeries: [],
    iteration: 1,
    algorithmType: 'PARTITION',
    correct: '',
    wrongArray: [],
    disabledArray: [],
    pivot: 0,
    end: false
};
for(let i = 6; i > 0; i--){
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
            return {
                ...state,
                algorithmType: action.payload
            };
        case 'SET_PIVOT':
            console.log(action.payload);
            return {
                ...state,
                pivot: action.payload
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
                case 'MERGESORT': {
                    let {result, wrongArray, disabledArray, end} = mergeSort(state.iteration, state.initialSeries, state.workingSeries);

                    return {
                        ...state,
                        iteration: (result ? state.iteration + 1 : state.iteration),
                        correct: result,
                        wrongArray: wrongArray,
                        disabledArray: disabledArray,
                        end: end
                    };
                }
                case 'PARTITION': {
                    let {result, wrongArray, end} = partition(state.iteration, state.initialSeries, state.workingSeries, state.pivot);

                    return {
                        ...state,
                        iteration: (result ? state.iteration + 1 : state.iteration),
                        correct: result,
                        wrongArray: wrongArray,
                        end: end
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