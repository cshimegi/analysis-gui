import { Component, OnInit } from '@angular/core';
import { ChartService, ElementService } from '@app/_services_';

@Component({
    selector: 'app-syslog',
    templateUrl: './syslog.component.html',
    styleUrls: ['./syslog.component.scss']
})

export class SyslogComponent implements OnInit {

    constructor(
        private chartServie: ChartService,
        private elementService: ElementService
    ) { }

    ngOnInit(): void {
        this.chartServie.drawSineCurve('chart-svg');

        let data = [
            {'no': 1, 'name': 'alan', 'test': 123, 'year': 2020},
            {'no': 2, 'name': 'alan', 'test': 123, 'year': 2020}
        ];
        let columns = ['no', 'name', 'test', 'year'];
        this.elementService.tabulate('table-list', data, columns);
    }

}
