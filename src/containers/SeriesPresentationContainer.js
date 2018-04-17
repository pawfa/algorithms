import React, {Component} from 'react'
import {connect} from "react-redux";
import SeriesBlock from '../components/SeriesBlock'
import {checkCorrectness, changeBlocksOrder} from "../actions";
import './SeriesPresentationContainer.css'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

class SeriesInputContainer extends Component {

    constructor() {
        super();
        this.state = {
            value: 'coconut',
            disabled: false
        };
    }

    moveBlock = (dragIndex, hoverIndex) => {
        const {workingSeries} = this.props;
        const dragNumber = workingSeries[dragIndex];
        this.props.changeBlocksOrder(dragIndex, hoverIndex, dragNumber);
    };

    createBlock(i, numberObject) {
        const {value, id} = numberObject;
        return (
            <SeriesBlock key={id} index={i} id={id} number={value} moveBlock={this.moveBlock}/>
        )
    }

    render() {
        const {workingSeries, iteration, correct, wrongArray, end} = this.props;
        const blocks = [];
        for (let i = 0; i < workingSeries.length; i++) {
            blocks.push(this.createBlock(i, workingSeries[i]));
        }

        console.log('end '+end);
        console.log('correct '+correct);
        return <div className={'presentationContainer'}>
            <div className="row">
            <div className={'iterationNumber'}><h5>Iteration number: {iteration}</h5></div>
            </div>
            <div className="row">
            <div className={'blockContainer'}>{blocks}</div>
            </div>
            <div className="row">
            <button type='text' onClick={()=>this.props.checkCorrectness()}>Check</button>
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
            dispatch(checkCorrectness('SELECTIONSORT'))
        }

    }
};
SeriesInputContainer = DragDropContext(HTML5Backend)(SeriesInputContainer);
SeriesInputContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesInputContainer);
export default SeriesInputContainer;

