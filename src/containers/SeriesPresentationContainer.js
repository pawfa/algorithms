import React, {Component} from 'react'
import {connect} from "react-redux";
import SeriesBlock from '../components/SeriesBlock'
import {checkCorrectness, changeBlocksOrder} from "../actions";
import './SeriesPresentationContainer.css'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

class SeriesInputContainer extends Component {

    moveBlock = (dragIndex, hoverIndex) => {
        const {workingSeries} = this.props;
        const dragNumber = workingSeries[dragIndex];
        this.props.changeBlocksOrder(dragIndex, hoverIndex, dragNumber);
    };

    createBlock(i, numberObject) {
        const {value, id} = numberObject;
        const {wrongArray,iteration} = this.props;
        const blockClass = wrongArray.includes(i) ? 'wrong' : iteration === 1 ? '' :'correct';
        console.log(blockClass);
        return (
            <SeriesBlock key={id} index={i} id={id} number={value} resultClass={blockClass} moveBlock={this.moveBlock}/>
        )
    }

    render() {
        const {workingSeries, iteration, end} = this.props;
        const blocks = [];
        const showMessage = end ? "Series is sorted" :"Iteration number: "+iteration;
        for (let i = 0; i < workingSeries.length; i++) {
            blocks.push(this.createBlock(i, workingSeries[i]));
        }
        return <div className={'presentationContainer'}>
            <div className="row">
            <div className={'iterationNumber'}><h5>{showMessage}</h5></div>
            </div>
            <div className="row">
            <div className={'blockContainer'}>{blocks}</div>
            </div>
            <div className="row">
            <button type='text' disabled={end} onClick={()=>this.props.checkCorrectness()}>Check</button>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        workingSeries: state.seriesReducer.workingSeries,
        iteration: state.seriesReducer.iteration,
        correct: state.seriesReducer.correct,
        wrongArray: state.seriesReducer.wrongArray,
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
        }

    }
};
SeriesInputContainer = DragDropContext(HTML5Backend)(SeriesInputContainer);
SeriesInputContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesInputContainer);
export default SeriesInputContainer;

