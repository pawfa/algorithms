import React, {Component} from 'react'
import Chart from "../components/GraphComponents/Chart/Chart";

class GraphContainer extends Component {


    render(){
        const{chartData,algorithmType} = this.props;
        return <div className="App-chart-container">
            <Chart chartData={chartData} algorithmType={algorithmType}/>
        </div>
    }
}

export default GraphContainer;