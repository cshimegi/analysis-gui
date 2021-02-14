import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({ providedIn: 'root' })

export class BaseChartService {
    protected chartType: string;
    protected svg: any;
    protected data: Array<any>;
    protected options: any;
    protected xExtent: Array<any>;
    protected yExtent: Array<any>;
    protected xScale: any;
    protected yScale: any;
    protected xAxis: any;
    protected yAxis: any;

    // SVG basic settings
    protected width: number = 960;
    protected height: number = 640;
    protected padding: any = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    }
    protected margin: any = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    }
    protected innerWidth: number;
    protected innerHeight: number;
    protected viewBox: Array<number>;

    constructor () {}

    /**
     * Create svg
     */
    createSvg (selectorId: string) {
        this.svg = d3.select(`#${selectorId}`)
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', this.viewBox);
        return this;
    }

    getSvg () {
        return this.svg;
    }

    setViewBox (viewBox?: Array<number>) {
        this.viewBox = viewBox ?? [0, 0, this.width, this.height];
        
        return this;
    }

    getViewBox () {
        return this.viewBox;
    }

    protected setExtentX (xExtent: Array<any>) {
        this.xExtent = xExtent;
        return this;
    }

    getExtentX () {
        return this.xExtent;
    }

    protected setExtentY (yExtent: Array<any>) {
        this.yExtent = yExtent;
        return this;
    }

    getExtentY () {
        return this.yExtent;
    }

    protected setScaleX (xScale: any) {
        this.xScale = xScale;
        return this;
    }

    getScaleX () {
        return this.xScale;
    }

    protected setScaleY (yScale: any) {
        this.yScale = yScale;
        return this;
    }

    getScaleY () {
        return this.yScale;
    }

    protected setAxisX (isBottom: boolean) {
        this.xAxis = isBottom ? d3.axisBottom() : d3.axisTop();
        this.xAxis.scale(this.xScale);

        return this;
    }

    getAxisX () {
        return this.xAxis;
    }

    protected setAxisY (isLeft: boolean) {
        this.yAxis = isLeft ? d3.axisLeft() : d3.axisRight();
        this.yAxis.scale(this.yScale);

        return this;
    }

    getAxisY () {
        return this.yAxis;
    }

    setData (data: Array<any>) {
        this.data = data;
        return this;
    }

    setOptions (options: any) {
        this.options = options;

        if (options.width) {
            this.width = options.width;
        }

        if (options.height) {
            this.height = options.height;
        }

        if (options.padding) {
            this.padding = options.padding;
        }

        if (options.margin) {
            this.margin = options.margin;
        }

        this.innerWidth = this.width - (this.padding.left + this.padding.right) * 2;
        this.innerHeight = this.height - (this.padding.top + this.padding.bottom) * 2;

        return this;
    }

    protected addText (options: any) {
        let text = this.svg.append("text");
            
        if (options.attrs) {
            for (const[key, value] of Object.entries(options.attrs)) {
                text.attr(key, value);
            }
        }

        if (options.styles) {
            for (const[key, value] of Object.entries(options.styles)) {
                text.style(key, value);
            }
        }
        
        text.text(options.content ?? "");
    }

    // formatVechainToCandlestick(vechains: Vechain[]): any[]
    // {
    //     return vechains.map(function (vechain: Vechain) {
    //         return {
    //             t: vechain.period,
    //             o: vechain.open,
    //             h: vechain.high,
    //             l: vechain.low,
    //             c: vechain.close
    //         };
    //     });
    // }
}