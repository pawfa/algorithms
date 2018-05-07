import React, {Component} from 'react'
import Chart from "../components/GraphComponents/Chart/Chart";

class GraphContainer extends Component {


    render(){
        return <div className="App-chart-container">
            <Chart chartData={this.props.chartData}/>
        </div>
    }
}

export default GraphContainer;