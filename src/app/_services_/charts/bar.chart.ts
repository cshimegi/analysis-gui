import { Injectable } from '@angular/core';
import { BaseChartService } from './base.chart';
import * as d3 from 'd3';

@Injectable({ providedIn: 'root' })

export class BarChartService extends BaseChartService{
    protected chartType: string = "bar";
    private rootLayer: any;
    private axisLayer: any;
    private xAxisLayer: any;
    private yAxisLayer: any;
    private rectLayer: any;

    constructor() {
        super();
    }

    initRootLayer () {
        this.rootLayer = this.svg.append('g')
            .attr('transform', `translate(${this.padding.left}, ${this.padding.right})`);
        
        return this
    }

    initAxisLayer () {
        this.axisLayer = this.rootLayer.append('g');
        
        return this;
    }

    initRectLayer () {
        this.rectLayer = this.rootLayer.append('g');
        
        return this;
    }

    private setTimeExtentX () {
        this.setExtentX(this.data.map(d => d.datetime));
    }

    private setTimeScaleX () {
        const scaleX = d3.scaleBand()
            .domain(this.xExtent)
            .rangeRound([0, this.innerWidth])
            .padding(0);
        
        this.setScaleX(scaleX);
    }

    initTimeAxisX (isBottom: boolean)
    {
        this.setTimeExtentX();
        this.setTimeScaleX();
        this.setAxisX(isBottom);
        
        this.xAxisLayer = this.axisLayer.append('g')
            .attr('transform', `translate(${0}, ${this.innerHeight})`)
            .call(this.xAxis);
        
        return this;
    }

    private setAmountExtentY () {
        this.setExtentY([0, d3.max(this.data, d => d.amount)]);
    }

    private setAmountScaleY () {
        const scaleY = d3.scaleLinear()
            .domain(this.yExtent)
            .range([this.innerHeight, this.padding.top + this.padding.bottom])
            .nice();
        
        this.setScaleY(scaleY);
    }

    initAmountAxisY (isLeft: boolean)
    {
        this.setAmountExtentY();
        this.setAmountScaleY();
        this.setAxisY(isLeft);
        this.addIntegerTickToAxisY();

        this.yAxisLayer = this.axisLayer.append('g').call(this.yAxis);

        return this;
    }

    private addIntegerTickToAxisY ()
    {
        const yAxisTicks = this.getScaleY().ticks().filter(tick => Number.isInteger(tick));
        this.getAxisY().tickValues(yAxisTicks).tickFormat(d3.format('d'));
    }

    addTitle (options: any) {
        if (!options.attrs) {
            options.attrs = {
                transform: `translate(${this.innerWidth / 2}, ${this.padding.top})`
            };
        } else if (!options.attrs.transform) {
            options.attrs.transform = `translate(${this.innerWidth / 2}, ${this.padding.top})`;
        }

        this.addText(options);
        
        return this;
    }

    addAxisXLabel (options: any) {
        if (!options.attrs) {
            options.attrs = {
                transform: `translate(${this.innerWidth}, ${this.height})`
            };
        } else if (!options.attrs.transform) {
            options.attrs.transform = `translate(${this.innerWidth}, ${this.height})`;
        }

        this.addText(options);
        
        return this;
    }

    addAxisYLabel (options: any) {
        if (!options.attrs) {
            options.attrs = {
                x: this.padding.left,
                y: this.padding.top
            };
        } else if (!options.attrs.x || !options.attrs.y) {
            options.attrs.x = options.attrs.x ?? this.padding.left;
            options.attrs.y = options.attrs.y ?? this.padding.top;
        }

        this.addText(options);
        
        return this;
    }

    drawAmountTimeChart (rectWidth?: number, deltaX?: number): void
    {
        const rw = rectWidth ?? this.xScale.bandwidth() / 5;
        const dx = deltaX ?? rw * 2;

        this.rectLayer
            .selectAll('rect')
            .data(this.data, d => d.datetime)
            .enter()
            .append('rect')
            .attr('class', 'rect')
            .attr('x', d => this.xScale(d.datetime) + dx)
            .attr('y', d => this.yScale(d.amount))
            .attr('width', rw)
            .attr('height', d => this.yScale(0) - this.yScale(d.amount))
            .attr('fill', 'blue')
    }
}