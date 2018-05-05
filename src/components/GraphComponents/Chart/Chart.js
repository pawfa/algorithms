import React, {Component} from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from '../Axes/Axes'
import Bars from "../Bars/Bars";

class Chart extends Component {

    constructor(props) {
        super(props);
        this.xScale = scaleBand();
        this.yScale = scaleLinear();
    }

    render(){
        const {data} = this.props;
        const margins = { top: 50, right: 20, bottom: 50, left: 60 };
        const svgDimensions = { width: 600, height: 300 };

        const maxValue = Math.max(...data.map(d => d.value));

        // scaleBand type
        const xScale = this.xScale
            .padding(0.05)
            .domain(data.map((d) => d.id))
            .range([margins.left, svgDimensions.width - margins.right]);

        // scaleLinear type
        const yScale = this.yScale
            .domain([0, maxValue])
            .range([svgDimensions.height - margins.bottom, margins.top]);

        return <svg width={svgDimensions.width} height={svgDimensions.height}>
            <Axes
                scales={{ xScale, yScale }}
                margins={margins}
                svgDimensions={svgDimensions}
            />
            <Bars
                scales={{ xScale, yScale }}
                margins={margins}
                data={data}
                maxValue={maxValue}
                svgDimensions={svgDimensions}
            />
        </svg>
    }
}
export default Chart;