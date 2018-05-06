import React, {Component} from 'react'
import {selectAll, select, duration} from "d3-selection";

export default class Bars extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    componentWillReceiveProps(nextProps) {
        const {chartArray} = nextProps.data;
        let svg = select("#graph");
        let rects = svg.selectAll("rect")
            .data(chartArray)
            .transition()
            .duration(100 / 2 | 0);
    }

    createRectangles() {
        const {scales, margins, svgDimensions} = this.props;
        const {chartArray, minIndex, current} = this.props.data;
        const {xScale, yScale} = scales;
        const {height} = svgDimensions;
        let arr = [];

        for (let i = 0; i < chartArray.length; i++) {
            let input = chartArray[i];
            let color = '#8221AB';
            console.log(current);
            if (i === current) {
                color = 'black'
            }
            if (i === minIndex) {
                color = 'white'
            }

            arr.push(
                <rect
                    key={input.id}
                    x={xScale(input.id)}
                    y={yScale(input.value)}
                    height={height - margins.bottom - scales.yScale(input.value)}
                    width={xScale.bandwidth()}
                    fill={color}
                />)
        }
        return arr;
    }

    render() {

        const bars = (this.createRectangles());

        return (<g>
            {bars}
            </g>
        )
    }
}