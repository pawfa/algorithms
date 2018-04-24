import React, {Component} from 'react'
import {connect} from "react-redux";
import {changeAllSeries, setAlgorithmType} from "../actions";
import './SeriesInputContainer.css'
import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'

class SeriesInputContainer extends Component {
    constructor() {
        super();
        this.state = {
            disabled: false
        };
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
        console.log(event.value);
        this.props.setAlgorithmType(event.value);
    };

    render() {
        const {initialSeries} = this.props;
        const inputSeries = [];
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
                                   disabled={(this.state.disabled) ? "disabled" : ""}
                                   onChange={(event) => {
                                       this.changeStringToArray(event)
                                   }}/>
                        </div>
                    </div>
                    <ReactMaterialSelect label='Choose algorithm' defaultValue='SelectionSort' onChange={this.chooseSortingAlgorithm}>
                        <option dataValue="SelectionSort">SelectionSort</option>
                        <option dataValue="InsertionSort">InsertionSort</option>
                        <option dataValue="MergeSort">MergeSort</option>
                    </ReactMaterialSelect>
                </form>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        initialSeries: state.seriesReducer.initialSeries
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeAllSeries: (series) => {
            dispatch(changeAllSeries(series))
        },
        setAlgorithmType: (algorithm) =>{
            dispatch(setAlgorithmType(algorithm))
        }
    }
};
SeriesInputContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesInputContainer);
export default SeriesInputContainer;

