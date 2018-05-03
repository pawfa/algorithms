import React, {Component} from 'react'
import {connect} from "react-redux";
import SeriesBlock from '../components/SeriesBlock'
import {checkCorrectness, changeBlocksOrder, setPivot} from "../actions";
import './SeriesPresentationContainer.css'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

class SeriesInputContainer extends Component {

    moveBlock = (dragIndex, hoverIndex) => {
        const {workingSeries} = this.props;
        const dragNumber = workingSeries[dragIndex];
        this.props.changeBlocksOrder(dragIndex, hoverIndex, dragNumber);
    };

    choosePivot = (event) =>{
      this.props.setPivot(event);
    };

    createBlock(i, numberObject) {
        const {value, id} = numberObject;
        const {wrongArray, disabledArray,pivot} = this.props;
        let blockClass = '';
        if(this.props.algorithmType === 'PARTITION' && pivot === id){
            blockClass = 'pivot';
        }

        if(wrongArray.includes(id)){
            blockClass = blockClass +'wrong'
        }else if(disabledArray.includes(id)){
            blockClass = blockClass+'disabled'
        }

        let clickable = undefined;
        let pointer = null;
        if(this.props.algorithmType === 'PARTITION'){
            clickable = this.choosePivot;
            pointer = {'cursor': 'pointer'}
        }
        return (
            <SeriesBlock click={clickable} key={id} pointer={pointer} index={i} id={id} number={value} resultClass={blockClass} moveBlock={this.moveBlock}/>
        )
    }

    render() {
        const {workingSeries, iteration, end} = this.props;
        const blocks = [];
        let showMessage = "Iteration number: "+iteration;
        if(this.props.algorithmType === 'PARTITION'){
            if(end){
                showMessage = 'Series partitioned';
            }else{
                showMessage = "Choose pivot";
            }
        }else if(end){
            showMessage = "Series is sorted";
        }
        // const showMessage = end ? this.props.algorithmType === 'PARTITION' ? 'Series partitioned' :"Series is sorted" :"Iteration number: "+iteration;
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
            <button className={'buttonPresentation'} type='text' disabled={end} onClick={()=>this.props.checkCorrectness()}>Check</button>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        workingSeries: state.seriesReducer.workingSeries,
        algorithmType: state.seriesReducer.algorithmType,
        iteration: state.seriesReducer.iteration,
        correct: state.seriesReducer.correct,
        wrongArray: state.seriesReducer.wrongArray,
        disabledArray: state.seriesReducer.disabledArray,
        end: state.seriesReducer.end,
        pivot:state.seriesReducer.pivot
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
        setPivot: (pivotId) =>{
            dispatch(setPivot(pivotId))
        }
    }
};
SeriesInputContainer = DragDropContext(HTML5Backend)(SeriesInputContainer);
SeriesInputContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesInputContainer);
export default SeriesInputContainer;

