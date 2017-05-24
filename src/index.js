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
