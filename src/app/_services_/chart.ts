import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';

@Injectable({ providedIn: 'root' })

export class ChartService {
    private canvas: any;
    private ctx: any;
    private canvasData: Object;
    private options: Object;

    constructor() {}

    initCanvas(chartId: string) {
        this.canvas = document.getElementById(chartId);
        this.ctx = this.canvas.getContext('2d');
        return this;
    }

    setData(data: Object) {
        this.canvasData = data;
        return this;
    }

    setOptions(options: Object) {
        this.options = options;
        return this;
    }
    
    /**
     * Create line chart
     * 
     * @param canvasId 
     */
    createLineChart() {
        return new Chart(this.ctx, {
            type: 'line',
            data: this.canvasData,
            options: this.options
        });
    }
}