import React, {Component} from 'react'
import {connect} from "react-redux";
import GraphComponent from "../components/GraphComponent";

class GraphContainer extends Component {

    render(){
        return <GraphComponent/>
    }
}

const mapStateToProps = (state) => {
    return {
        initialSeries: state.seriesReducer.initialSeries,
        algorithmType: state.seriesReducer.algorithmType
    }
};
GraphContainer = connect(mapStateToProps)(GraphContainer);
export default GraphContainer;