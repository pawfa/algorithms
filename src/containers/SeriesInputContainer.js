import React, {Component} from 'react'
import {connect} from "react-redux";
import {changeAllSeries, setAlgorithmType} from "../actions";
import './SeriesInputContainer.css'
import {Modal, Button, Row, Col} from "react-materialize";

class SeriesInputContainer extends Component {
    constructor() {
        super();
    }

    changeStringToArray = (event) => {
        let seriesArray = event.target.value.split(",");
        let seriesObjectsArray = [];
        for (let i = 0; i < seriesArray.length; i++) {
            seriesObjectsArray.push({
                id: i,
                value: seriesArray[i]
            })
        }
        this.props.changeAllSeries(seriesObjectsArray);
    };

    chooseSortingAlgorithm = (event) =>{
        this.props.setAlgorithmType(event.target.value);
    };

    render() {
        const {initialSeries, algorithmType} = this.props;
        const inputSeries = [];
        const buttonNames = ["SELECTIONSORT","INSERTIONSORT","MERGESORT","PARTITION"];

        const buttons = buttonNames.map((e,i)=>{
            let active = e === algorithmType ? ' active': '';
            return <button className={'button'+ active} value={e} onClick={this.chooseSortingAlgorithm} key={i}>{e}</button>});
        for (let i = 0; i < initialSeries.length; i++) {
            inputSeries.push(initialSeries[i].value)
        }

        return <div className={'container inputContainer'}>
                <Row className="mainRow">
                <form className="inputForm">
                    <Row>
                        <div className="input-field">
                            <input placeholder="Series"
                                   id="first_name"
                                   type="text"
                                   value={inputSeries}
                                   className="validate"
                                   onChange={(event) => {
                                       this.changeStringToArray(event)
                                   }}/>
                        </div>
                    </Row>

                </form>
                    <Modal
                        header='Explanation'
                        trigger={<Button className={'buttonModal '}>What is it?</Button>}>
                        <p>It's an application where you can try to understand how some algorithms work. First you need to type input series which you want to sort. Then you choose algorithm
                            type by clicking on one of the buttons below. After choosing algorithm you need to to
                            set series of numbers in correct order depending of consecutive iterations.
                            In partition algorithm you also have to pick a pivot</p>
                    </Modal>
                </Row>
            <div>{buttons}</div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        initialSeries: state.seriesReducer.initialSeries,
        algorithmType: state.seriesReducer.algorithmType
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeAllSeries: (series) => {
            dispatch(changeAllSeries(series))
        },
        setAlgorithmType: (algorithm) =>{
            dispatch(setAlgorithmType(algorithm))
        },
    }
};
SeriesInputContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesInputContainer);
export default SeriesInputContainer;

