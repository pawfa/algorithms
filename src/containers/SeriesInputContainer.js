import React, {Component} from 'react'
import {connect} from "react-redux";
import {changeAllSeries} from "../actions";
import './SeriesInputContainer.css'

class SeriesInputContainer extends Component {
    constructor() {
        super();
        this.state = {
            value: 'coconut',
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
                    {/*<button type='text' onClick={() => {*/}
                        {/*this.setState({disabled: true})*/}
                    {/*}}>Start*/}
                    {/*</button>*/}
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
        }
    }
};
SeriesInputContainer = connect(mapStateToProps, mapDispatchToProps)(SeriesInputContainer);
export default SeriesInputContainer;

