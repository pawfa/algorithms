import {selectionSort} from '../algorithms/SelectionSort.js'
import {insertionSort} from "../algorithms/InsertionSort";
import {mergeSort} from "../algorithms/MergeSort";
import {partition} from "../algorithms/Partition";

const initialState = {
    initialSeries:[],
    workingSeries: [],
    wrongArray: [],
    chartData: {
        chartArray: [],
        current: 0,
        minIndex: 0,
        iteration: -1,
        mergeArray:[]
    },
    iteration: 1,
    pivot: 1,
    current: 0,
    algorithmType: 'SELECTIONSORT',
    correct: '',
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
    initialState.chartData.chartArray.push({
        id:i,
        value:i
    });
}

const seriesReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'CHANGE_ALL_SERIES':
            return {
                ...initialState,
                algorithmType: state.algorithmType,
                initialSeries: action.payload,
                chartData: {
                    ...initialState.chartData,
                    chartArray: action.payload
                },
                workingSeries: action.payload,
            };
        case 'ALGORITHM_TYPE':
            return {
                ...initialState,
                initialSeries: state.initialSeries,
                workingSeries: state.initialSeries,
                chartData: {
                    ...initialState.chartData,
                    chartArray: state.initialSeries
                },
                algorithmType: action.payload
            };
        case 'SET_PIVOT':
            return {
                ...initialState,
                algorithmType: state.algorithmType,
                pivot: action.payload
            };
        case 'CHANGE_BLOCKS_ORDER':
            const [result] = action.payload;
            return { ...state, workingSeries: result };

        case 'CHECK_ALGORITHM':
            switch(state.algorithmType){
                case 'SELECTIONSORT': {
                    let {result, wrongArray} = selectionSort(state.iteration, state.initialSeries, state.workingSeries);

                    return {
                        ...state,
                        iteration: (result ? state.iteration + 1 : state.iteration),
                        correct: result,
                        wrongArray: wrongArray,
                        end: state.iteration === state.initialSeries.length - 1 && wrongArray.length === 0
                    };
                }
                case 'INSERTIONSORT': {
                    let {result, wrongArray} = insertionSort(state.iteration, state.initialSeries, state.workingSeries);

                    return {
                        ...state,
                        iteration: (result ? state.iteration + 1 : state.iteration),
                        correct: result,
                        wrongArray: wrongArray,
                        end: state.iteration === state.initialSeries.length - 1 && wrongArray.length === 0
                    };
                }
                case 'MERGESORT': {
                    let {result, wrongArray, end} = mergeSort(state.iteration, state.initialSeries, state.workingSeries);

                    return {
                        ...state,
                        iteration: (result ? state.iteration + 1 : state.iteration),
                        correct: result,
                        wrongArray: wrongArray,
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
        case 'SORT_GRAPH':

            return {
                ...state,
                chartData: action.payload
            };
        default:
            return state;
    }

};

export default seriesReducer