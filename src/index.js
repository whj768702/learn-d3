import * as d3 from 'd3';

//svg绘制区域的宽和高
const width = 400;
const height = 400;

//上下左右的边距
const padding = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

//矩形所占的宽度(包括空白)
const rectStep = 35;
//矩形的宽度(不包括空白)
const rectWidth = 30;

const dataset = [50, 43, 120, 87, 99, 167, 142];
const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
const rect = svg.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('fill', 'steelblue')
                .attr('x', function(d, i){
                    return padding.left + i* rectStep;
                })
                .attr('y', function(d){
                    return height - padding.bottom - d;
                })
                .attr('width', rectWidth)
                .attr('height', function(d){
                    return d;
                });
const text = svg.selectAll('text')
                .data(dataset)
                .enter()
                .append('text')
                .attr('fill', 'white')
                .attr('font-size', '14px')
                .attr('text-anchor', 'middle')
                .attr('x', function(d, i){
                    return padding.left + i*rectStep;
                })
                .attr('y', function(d){
                    return height -padding.bottom - d;
                })
                .attr('dx', rectWidth/2)
                .attr('dy', '1em')
                .text(function(d){
                    return d;
                });

//线性比例尺
const xScale = d3.scaleLinear()
                 .domain([0, 10])
                 .range([0, 300]);
//指数比例尺
const pow = d3.scalePow()
              .exponent(2)
              .domain([0, 1])
              .range([0, 500]);
//对数比例尺
const log = d3.scaleLog()
              .domain([0.01, 1])
              .range([0, 500]);
/*x轴
d3.axisBottom、d3.axisTop
ticks(value):刻度数目
tickValues():刻度值
tickFormat():格式化刻度
*/
const axisX = d3.axisBottom().scale(xScale);
const gXAxis = svg.append('g').attr('transform', 'translate(80, 80)');
gXAxis.call(axisX);//效果相同: axis(gAxis);
//y轴
//d3.axisLeft、d3.axisRight
const axisY = d3.axisLeft().scale(xScale);
const gYAxis = svg.append('g').attr('transform', 'translate(20,10)');
gYAxis.call(axisY);