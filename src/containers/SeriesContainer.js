import React, { Component } from 'react'
import {connect} from "react-redux";
import Series from '../components/Series'
import {addSeries} from "../actions";
class AddSeries extends Component {

    changeSeries(){

    }

    render () {
        return <div><Series someProp={this.props.series} />
            <button onClick={()=>{this.props.addSeries([4,5,6,7,8])}}>Click to set series</button>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
        series: state.algorithmSeries.series
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addSeries: (series) =>{
            dispatch(addSeries(series))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddSeries)

