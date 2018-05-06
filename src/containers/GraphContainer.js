import React, {Component} from 'react'
import Chart from "../components/GraphComponents/Chart/Chart";

class GraphContainer extends Component {


    render(){
        return <div className="App-chart-container">
            <Chart chartData={this.props.chartData} data={[5,10,1,3]} size={[500,500]} />
        </div>
    }
}

export default GraphContainer;