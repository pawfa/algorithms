import React, {Component} from 'react'
import {connect} from "react-redux";
import {changeAllSeries, setAlgorithmType} from "../actions";
import './SeriesInputContainer.css'

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
        console.log(event.target.value);
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

                <form className="inputForm">
                    <div className="row">
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
                    </div>
                </form>
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

