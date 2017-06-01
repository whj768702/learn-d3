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
const svg1 = d3.select('#container1').append('svg').attr('width', width).attr('height', height);
const rect = svg1.selectAll('rect')
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
const text = svg1.selectAll('text')
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
const gXAxis = svg1.append('g').attr('transform', 'translate(80, 80)');
gXAxis.call(axisX);//效果相同: axis(gAxis);
//y轴
//d3.axisLeft、d3.axisRight
const axisY = d3.axisLeft().scale(xScale);
const gYAxis = svg1.append('g').attr('transform', 'translate(20,10)');
gYAxis.call(axisY);


//柱形图的坐标轴
const svg2 = d3.select('#container2').append('svg').attr('width', width).attr('height', height);
const xAxisWidth = 300;
const yAxisWidth = 300;

const xScale2 = d3.scaleBand().domain(d3.range(dataset.length)).range([0, xAxisWidth], 0.2);
const yScale2 = d3.scaleLinear().domain([0, d3.max(dataset)]).range([0, yAxisWidth]);

const rect2 = svg2.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('fill', 'steelblue')
                .attr('x', function(d, i){
                    return padding.left + xScale2(i);
                })
                .attr('y', function(d){
                    return height - padding.bottom - yScale2(d);
                })
                .attr('width', xScale2.bandwidth())
                .attr('height', function(d){
                    return yScale2(d);
                });
const xAxis2 = d3.axisBottom().scale(xScale2);
yScale2.range([yAxisWidth, 0]);
const yAxis2 = d3.axisLeft().scale(yScale2);

svg2.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate('+padding.left+','+(height-padding.bottom)+')')
    .call(xAxis2);
svg2.append('g')
    .attr('class', 'axis')
    // .attr('transform', 'translate('+padding.left+','+padding.top+')')
    .attr('transform', 'translate(20, 80)')
    .call(yAxis2);

//container3
/*
 画X轴和Y轴.
 使用线性比例尺.domain是定义域，range是值域.
 d3.axisBottom:x轴坐标显示在轴线下方.
 d3.axisTop:x轴坐标显示在轴线上方.
 d3.axisLeft:y轴坐标显示在轴线左方.
 d3.axisRight:y轴坐标显示在轴线右方.
 */
const margin3 = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};
const svg3 = d3.select('#container3').append('svg').attr('width', width).attr('height', height).style('border','1px solid blue');
const xScale3 = d3.scaleLinear().domain([0,10]).range([0, width-margin3.left-margin3.right]);
const xAxis3 = d3.axisBottom().scale(xScale3);
svg3.append('g').attr('transform', 'translate('+margin3.left+','+ 9*margin3.bottom+')').call(xAxis3);
//定义域是0-dataset中最大值.
//值域是svg高度减上下空白-0.
const yScale3 = d3.scaleLinear().domain([0, d3.max(dataset)]).range([height-margin3.top-margin3.bottom,0]);
const yAxis3 = d3.axisLeft().scale(yScale3);
svg3.append('g').attr('transform', 'translate('+margin3.left+','+margin3.top+')').call(yAxis3);
//x,y:每个柱状图的起始坐标.
//width,height:柱状图的宽度和高度.
const rect3 = svg3.selectAll('rect')
                  .data(dataset)
                  .enter()
                  .append('rect')
                  .attr('fill', 'steelblue')
                  .attr('x', function(d, i){return i*20+margin3.top;})
                  .attr('y', function(d){return yScale3(d)+40;})
                  .attr('width', 10)
                  .attr('height', function(d){return height-margin3.top-margin3.bottom-yScale3(d);});