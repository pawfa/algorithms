import React, {Component} from 'react'
import * as d3 from "d3";
import 'd3-selection-multi';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            svg: "",
            scales: {},
            axes: {}
        }
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate() {
        // this.createBarChart()
        this.updateBarChart();
    }

    createBarChart = () => {
        const margin = {top: 30, right: 10, bottom: 30, left: 50},
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            barWidth = 40,
            barOffset = 20;


        const {chartArray} = this.props.chartData;
        const data = chartArray.map(e => Number(e.value));
        const dataMax = Math.max(...data);

        const yScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([0, height]);

        const xScale = d3.scaleBand()
            .domain(d3.range(0, data.length))
            .range([0, width]);

        const colors = d3.scaleLinear()
            .domain([0, data.length * .33, data.length * .66, data.length])
            .range(['#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1']);

        const svg = d3.select('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style('background', '#bce8f1')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll('rect').data(data)
            .enter().append('rect')
            .styles({
                'fill': function(data, i) {
                    return colors(i);
                },
                'stroke': '#31708f',
                'stroke-width': '1'
            })
            .attr('width', xScale.bandwidth())
            .attr('x', function(data, i) {
                return xScale(i);
            })
            .attr('height', 0)
            .attr('y', height);

        svg.transition()
            .attr('height', function(data) {
                return yScale(data);
            })
            .attr('y', function(data) {
                return height - yScale(data);
            })
            .delay(function(data, i) {
                return i * 20;
            })
            .duration(2000)
            .ease(d3.easeElastic);


        const verticalGuideScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
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

        const hAxis = d3.axisBottom(xScale)
            .ticks(data.length);

        const horizontalGuide = d3.select('svg').append('g');
        hAxis(horizontalGuide);
        horizontalGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
        horizontalGuide.attr("class", "x axis");
        horizontalGuide.selectAll('path')
            .styles({
                fill: 'none',
                stroke: "#3c763d"
            });
        horizontalGuide.selectAll('line')
            .styles({
                stroke: "#3c763d"
            });

        this.setState({
            svg: svg,
            scales: { xScale: xScale, yScale: yScale },
            axes: { xAxis: hAxis, yAxis: vAxis }
        })
    };

    updateBarChart = () => {

        const margin = {top: 30, right: 10, bottom: 30, left: 50},
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const {chartArray} = this.props.chartData;
        const {xAxis, yAxis} = this.state.axes;
        const data = chartArray.map(e => Number(e.value)).reverse();
        const dataMax = Math.max(...data);

        const yScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([0, height]);

        const xScale = d3.scaleBand()
            .domain(d3.range(0, data.length))
            .range([0, width]);


        const svg = d3.select('svg');
        svg.select('.x.axis').transition().duration(300).call(xAxis);

        // same for yAxis but with more transform and a title
        svg.select(".y.axis").transition().duration(300).call(yAxis);

        const bars = svg.selectAll("rect").data(data);

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", yScale(0))
            .attr("height", height - yScale(0));

        const verticalGuideScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height, 0]);

        bars.transition()
            .attr('height', function(data) {
            return height - verticalGuideScale(data);
        })
            .attr('y', function(data) {
                return height - verticalGuideScale(data);
            })
            .delay(function(data, i) {
                return i * 20;
            })
            .duration(2000)
            .ease(d3.easeElastic);

    };

    render() {

        return <svg ref={node => this.node = node}>
        </svg>
    }


}

export default Chart;