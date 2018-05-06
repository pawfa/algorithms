import React, {Component} from 'react'
import {connect} from "react-redux";
import SeriesBlock from '../components/SeriesBlock'
import {checkCorrectness, changeBlocksOrder, setPivot, sendGraphData} from "../actions";
import './SeriesPresentationContainer.css'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import GraphContainer from "./GraphContainer";
import {selectionSortChart} from "../algorithms/SelectionSort";

class SeriesInputContainer extends Component {

    runSorting = () =>{
        const {chartArray} = this.props.chartData;
        selectionSortChart(chartArray,this.props.sendGraphData);

        // const self = this;
        //
        // let callCount = 0;
        // let repeater = setInterval(function () {
        //     if (callCount < chartArray.length) {
        //         self.props.sendGraphData(selectionSortChart(chartArray,callCount));
        //         callCount += 1;
        //     } else {
        //         clearInterval(repeater);
        //     }
        // }, 1000);
    };

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.props.workingSeries,
            result.source.index,
            result.destination.index
        );

        this.props.changeBlocksOrder(items);
    };

    choosePivot = (event) => {
        this.props.setPivot(event);
    };

    createBlock(i, numberObject) {
        const {value, id} = numberObject;
        const {wrongArray, pivot} = this.props;
        let blockClass = '';
        if (this.props.algorithmType === 'PARTITION' && pivot === id) {
            blockClass = 'pivot';
        }
        if (wrongArray.includes(id)) {
            blockClass = blockClass + 'wrong'
        }

        let clickable = undefined;
        let pointer = null;
        if (this.props.algorithmType === 'PARTITION') {
            clickable = this.choosePivot;
            pointer = {'cursor': 'pointer'}
        }
        return (
            <Draggable key={id} draggableId={id} index={i}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )
                        }
                    >
                        <SeriesBlock
                            click={clickable}
                            key={id}
                            pointer={pointer}
                            index={i}
                            id={id}
                            number={value}
                            resultClass={blockClass}/>
                    </div>
                )}
            </Draggable>
        )
    }

    render() {
        const {workingSeries, iteration, end, chartData} = this.props;

        const blocks = [];
        let showMessage = "Iteration number: " + iteration;
        if (this.props.algorithmType === 'PARTITION') {
            if (end) {
                showMessage = 'Series partitioned';
            } else {
                showMessage = "Choose pivot";
            }
        } else if (end) {
            showMessage = "Series is sorted";
        }
        for (let i = 0; i < workingSeries.length; i++) {
            blocks.push(this.createBlock(i, workingSeries[i]));
        }

        return (
            <div className={'container'}>
                <div className="row">
                    <GraphContainer chartData={chartData}/>
                    <button className={'buttonPresentation'} type='text' onClick={this.runSorting}>Sort</button>
                </div>

                <div className="row">
                    <div className={'iterationNumber'}><h5>{showMessage}</h5></div>
                </div>
            <div className="row">
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal" className={'blockContainer'}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {blocks}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            </div>
                <div className="row">
                <button className={'buttonPresentation'} type='text' disabled={end} onClick={()=>this.props.checkCorrectness()}>Check</button>
                </div>
            </div>
        );
    }

}

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#C3B6E3' : '#A79BC2',
    display: 'inline-flex',
    padding: grid,
    overflow: 'auto',
    border: '1px solid grey',
    borderRadius:'2px',
    margin: '0 auto',
    justifyContent: 'center'
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    width: '60px',
    height: '60px',
    display: 'inline',
    margin: '0 5px',
    padding: 0,
    border: '3px solid',
    ...draggableStyle,
});

const mapStateToProps = (state) => {
    return {
        initialSeries: state.seriesReducer.initialSeries,
        workingSeries: state.seriesReducer.workingSeries,
        wrongArray: state.seriesReducer.wrongArray,
        chartData: state.seriesReducer.chartData,
        iteration: state.seriesReducer.iteration,
        pivot: state.seriesReducer.pivot,
        current: state.seriesReducer.current,
        algorithmType: state.seriesReducer.algorithmType,
        correct: state.seriesReducer.correct,
        end: state.seriesReducer.end
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeBlocksOrder: (dragIndex, hoverIndex, dragNumber) => {
            dispatch(changeBlocksOrder(dragIndex, hoverIndex, dragNumber))
        },
        checkCorrectness: () => {
            dispatch(checkCorrectness())
        },
        setPivot: (pivotId) => {
            dispatch(setPivot(pivotId))
        },
        sendGraphData: (data) => {
            dispatch(sendGraphData(data))
        }
    }
};
SeriesInputContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesInputContainer);
export default SeriesInputContainer;

