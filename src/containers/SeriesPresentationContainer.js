import React, {Component} from 'react'
import {connect} from "react-redux";
import SeriesBlock from '../components/SeriesBlock'
import {checkCorrectness, changeBlocksOrder, setPivot} from "../actions";
import './SeriesPresentationContainer.css'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const grid = 8;

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    width: '60px',
    height: '60px',
    display: 'inline',
    margin: '0 5px',
    padding: 0,

    // change background colour if dragging
    border: '3px solid',
    // borderColor: isDragging ? '#596B59' : '#485058',

    // styles we need to apply on draggables
    ...draggableStyle,
});

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

class SeriesInputContainer extends Component {

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

    // render() {
    //     const {workingSeries, iteration, end} = this.props;
    //     const blocks = [];
    //     let showMessage = "Iteration number: "+iteration;
    //     if(this.props.algorithmType === 'PARTITION'){
    //         if(end){
    //             showMessage = 'Series partitioned';
    //         }else{
    //             showMessage = "Choose pivot";
    //         }
    //     }else if(end){
    //         showMessage = "Series is sorted";
    //     }
    //     // const showMessage = end ? this.props.algorithmType === 'PARTITION' ? 'Series partitioned' :"Series is sorted" :"Iteration number: "+iteration;
    //     for (let i = 0; i < workingSeries.length; i++) {
    //         blocks.push(this.createBlock(i, workingSeries[i]));
    //     }
    //
    //     return <div className={'presentationContainer'}>
    //         <div className="row">
    //         <div className={'iterationNumber'}><h5>{showMessage}</h5></div>
    //         </div>
    //         <div className="row">
    //             <DragDropContext onDragEnd={this.onDragEnd}>
    //                 <Droppable droppableId="droppable" direction="horizontal">
    //         <div className={'blockContainer'}>{blocks}</div>
    //                 </Droppable>
    //             </DragDropContext>
    //         </div>
    //         <div className="row">
    //         <button className={'buttonPresentation'} type='text' disabled={end} onClick={()=>this.props.checkCorrectness()}>Check</button>
    //         </div>
    //     </div>
    // }
    render() {
        const {workingSeries, iteration, end} = this.props;
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
        // const showMessage = end ? this.props.algorithmType === 'PARTITION' ? 'Series partitioned' :"Series is sorted" :"Iteration number: "+iteration;
        for (let i = 0; i < workingSeries.length; i++) {
            blocks.push(this.createBlock(i, workingSeries[i]));
        }
        return (
            <div className={'container'}>
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

const mapStateToProps = (state) => {
    return {
        workingSeries: state.seriesReducer.workingSeries,
        initialSeries: state.seriesReducer.initialSeries,
        algorithmType: state.seriesReducer.algorithmType,
        iteration: state.seriesReducer.iteration,
        correct: state.seriesReducer.correct,
        wrongArray: state.seriesReducer.wrongArray,
        end: state.seriesReducer.end,
        pivot: state.seriesReducer.pivot
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
        }
    }
};
SeriesInputContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesInputContainer);
export default SeriesInputContainer;

