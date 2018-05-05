import React, {Component} from 'react'
import Chart from "../components/GraphComponents/Chart/Chart";

class GraphContainer extends Component {


    render(){
        return <div className="App-chart-container">
            <Chart data={this.props.data} />
        </div>
    }
}

export default GraphContainer;