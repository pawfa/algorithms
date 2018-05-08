import React, {Component} from 'react'
import * as d3 from "d3";
import 'd3-selection-multi';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            axes: {}
        }
    }

    componentDidMount() {
        this.createBarChart();
    }

    componentDidUpdate() {
        console.log(this.props);
        this.updateBarChart();
    }

    createBarChart = () => {
        const margin = {top: 30, right: 10, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const {chartArray} = this.props.chartData;
        const data = chartArray.map(e => Number(e.value));
        const dataMax = Math.max(...data);

        const yScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([height, 0]);

        const xScale = d3.scaleBand()
            .domain(d3.range(0, data.length))
            .range([0, width]);

        const colors = d3.scaleLinear()
            .domain([0, dataMax])
            .range(['#D3CCE3', '#504B6B']);


        const svg = d3.select('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('rect').data(data)
            .enter().append("rect")
            .styles({
                'fill': function(data, i) {
                    return colors(data);
                },
                'stroke': '#31708f',
                'stroke-width': '1'
            })
            .attr("class", "bar")
            .attr("y", yScale(0))
            .attr("height", 0)
            .attr('width', xScale.bandwidth())
            .attr('x', function(data, i) {
                return i*xScale.bandwidth();
            })
            .transition().duration(200)
            .attr("x", function(d,i) { return i*xScale.bandwidth(); }) // (d) is one item from the data array, x is the scale object from above
            .attr("width", xScale.bandwidth()) // constant, so no callback function(d) here
            .transition()
            .duration(700)
            .ease(d3.easeBounce)
            .attr("y", function(d) { return yScale(d); })
            .attr("height", function(d) { return height - yScale(d); }); // flip the height, because y's domain is bottom up, but SVG renders top down


        const verticalGuideScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([height, 0]);

        const vAxis = d3.axisLeft(verticalGuideScale)
            .ticks(10);

        const verticalGuide = d3.select('svg').append('g');
        vAxis(verticalGuide);
        verticalGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        verticalGuide.attr("class", "y axis");
        verticalGuide.selectAll('path')
            .styles({
                fill: 'none',
                stroke: "#3c763d"
            });
        verticalGuide.selectAll('line')
            .styles({
                stroke: "#3c763d"
            });

        this.setState({
            height: height,
            scales: { xScale: xScale,yScale: verticalGuideScale },
            colors: colors
        });
    };

    updateBarChart = () => {

        const{height} = this.state;

        const {chartArray} = this.props.chartData;
        const {xScale, yScale} = this.state.scales;
        const {colors} = this.state;
        const data = chartArray.map(e => Number(e.value));
        const dataMax = Math.max(...data);
        const svg = d3.select('svg');

        colors.domain([0, dataMax]);
        yScale.domain([0, dataMax]);
        xScale.domain(d3.range(0, data.length));

        const bars = svg.select('g').selectAll("rect").data(data);

        bars.exit()
            .transition()
            .duration(300)
            .attr("y", yScale(0))
            .attr("height", height - yScale(0))
            .style('fill-opacity', 1e-6)
            .remove();

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", yScale(0))
            .attr("height", 0)
            .attr('x', (data.length-1)*xScale.bandwidth()
            );

        bars.transition().styles({
            'fill': function(data, i) {
                return colors(data);
            },
            'stroke': '#31708f',
            'stroke-width': '1'
        });

        bars.merge(bars).transition().styles({
                'fill': function(data, i) {
                    return colors(data);
                },
                'stroke': '#31708f',
                'stroke-width': '1'
            });
            bars.transition().duration(200)
                .styles({
                    'fill': function(data, i) {
                        return colors(data);
                    },
                    'stroke': '#31708f',
                    'stroke-width': '1'
                })
            .attr("x", function(d,i) { return i*xScale.bandwidth(); }) // (d) is one item from the data array, x is the scale object from above
            .attr("width", xScale.bandwidth()) // constant, so no callback function(d) here
                .transition()
                .duration(700)
                .ease(d3.easeBounce)
            .attr("y", function(d) { return yScale(d); })
            .attr("height", function(d) { return height - yScale(d); }); // flip the height, because y's domain is bottom up, but SVG renders top down

    };

    render() {
        return <svg ref={node => this.node = node}>
        </svg>
    }


}

export default Chart;