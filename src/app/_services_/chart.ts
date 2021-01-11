import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Point, Circle } from '@app/_models_';

@Injectable({ providedIn: 'root' })

export class ChartService {
    
    constructor(
        
    ) {}
    
    /**
     * Draw sine curve
     * 
     * @param elementId 
     * @param options
     */
    drawSineCurve(elementId, options) {
        let width = options.width,
            height = options.height,
            margin = 50;
        let svg = d3.select('#' + elementId)
            .append('svg')
            .style('width', width + 2 * margin)
            .style('height', height + 2 * margin);

        // let g = svg.append('g')
        //     .attr('transform', 'translate(' + margin + ', ' + margin + ')');

        // let sine = this.generateSineCurveData(0, 10);

        // let xScale = d3.scaleLinear()
        //     .range([0, width - margin])
        //     .domain(d3.extent(sine, function(d) {
        //         return d[0];
        //     }));

        // let yScale = d3.scaleLinear()
        //     .range([height - margin, 0])
        //     .domain([-1, 1]);

        // let xAxis = d3.axisBottom(xScale);
        // let yAxis = d3.axisLeft(yScale);

        // let line = d3.line()
        //     .x(function(d) {
        //         return xScale(d[0]);
        //     }).y(function(d) {
        //         return yScale(d[1]);
        //     }).curve(d3.curveBasis);

        // g.append('path')
        //  .datum(sine)
        //  .attr('d', line)
        //  .attr('stroke', 'black')
        //  .attr('stroke-width', 1)
        //  .attr('fill', 'none');

        // g.append('g')
        //  .classed('axis', true)
        //  .attr('transform', 'translate(0, ' + (height - margin) + ')')
        //  .call(xAxis);

        // g.append('g')
        //  .classed('axis', true)
        //  .call(yAxis);
    }

    /**
     * 
     * @param rangeLeft 
     * @param rangeRight 
     */
    generateSineCurveData(rangeLeft: number, rangeRight: number) {
        return d3.range(rangeLeft, rangeRight).map(function(k) {
            let x = 0.5 * k * Math.PI;
            return [x, Math.sin(x)];
        });
    }
}