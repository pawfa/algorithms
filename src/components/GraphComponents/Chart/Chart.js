import React, {Component} from 'react'
import * as d3 from "d3";
import 'd3-selection-multi';
import './Chart.css'

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            margin: {top: 30, right: 10, bottom: 30, left: 50},
            width: window.innerWidth * 0.3,
            height: window.innerHeight * 0.3,
            vAxis: ''
        }
    }

    updateDimensions() {
        this.setState(
            {
                ...this.state,
                width: window.innerWidth * 0.3,
                height: window.innerHeight * 0.3
            }
        );
        this.updateBarChart();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
        this.createBarChart();
    }

    componentDidUpdate() {
        this.updateBarChart();
    }

    createBarChart = () => {

        const {margin} = this.state;
        const width = this.state.width - margin.left - margin.right;
        const height = this.state.height - margin.top - margin.bottom;

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
                'fill': function (data, i) {
                    return colors(data);
                },
                'stroke': '#31708f',
                'stroke-width': '1'
            })
            .attr("y", yScale(0))
            .attr("height", 0)
            .attr('width', xScale.bandwidth())
            .attr('x', function (data, i) {
                return i * xScale.bandwidth();
            });

        const verticalGuideScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([height, 0]);

        const vAxis = d3.axisLeft(verticalGuideScale)
            .ticks(data.length)
            .tickFormat(function(e){
                if(Math.floor(e) !== e)
                {
                    return;
                }

                return e;
            });

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
            width: width,
            height: height,
            scales: {xScale: xScale, yScale: verticalGuideScale},
            colors: colors,
            vAxis: vAxis
        });
    };

    updateBarChart = () => {


        const {chartArray, current, minIndex, iteration} = this.props.chartData;
        const {xScale, yScale} = this.state.scales;
        const {colors, width, height, margin, vAxis} = this.state;
        const data = chartArray.map(e => Number(e.value));
        const dataMax = Math.max(...data);
        const svg = d3.select('svg');
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);


        colors.domain([0, dataMax]);
        yScale.range([height, 0]).domain([0, dataMax]);
        xScale.range([0, width]).domain(d3.range(0, data.length));
        svg.select('.y.axis')
            .call(vAxis);

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
            .attr('x', (data.length - 1) * xScale.bandwidth()
            );

        bars.transition().styles({
            'fill': function (data, i) {
                return colors(data);
            },
            'stroke': '#31708f',
            'stroke-width': '1'
        });

        bars.merge(bars).transition().styles({
            'fill': function (data, i) {
                return colors(data);
            },
            'stroke': '#31708f',
            'stroke-width': '1'
        });

        bars.transition().duration(200)
            .styles({
                'fill': function (data, i) {
                    if (i === current && i !== minIndex) {
                        return "#802CAB"
                    }
                    if (iteration >= 0 && iteration !== chartArray.length - 1 && i === minIndex) {
                        return "#F51E6E"
                    }
                    return colors(data);
                },
                'stroke': '#31708f',
                'stroke-width': '1'
            })
            .attr("x", function (d, i) {
                return i * xScale.bandwidth();
            })
            .attr("width", xScale.bandwidth())
            .transition()
            .duration(700)
            .ease(d3.easeBounce)
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("height", function (d) {
                return height - yScale(d);
            });

    };

    render() {
        return <svg ref={node => this.node = node}>
        </svg>
    }


}

export default Chart;