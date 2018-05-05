import React, { Component } from 'react'

export default class Bars extends Component {
    constructor(props) {
        super(props);
        this.color ='#8221AB';
    }

    render() {
        const { scales, margins, data, svgDimensions } = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        const bars = (
            data.map(datum =>
                <rect
                    key={datum.id}
                    x={xScale(datum.id)}
                    y={yScale(datum.value)}
                    height={height - margins.bottom - scales.yScale(datum.value)}
                    width={xScale.bandwidth()}
                    fill={this.color}
                />,
            )
        );

        return (
            <g>{bars}</g>
        )
    }
}