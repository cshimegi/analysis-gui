import { Component, OnInit } from '@angular/core';
import { ChartService } from '@app/_services_';
import * as  _ from 'lodash';

@Component({
    selector: 'app-syslog',
    templateUrl: './syslog.component.html',
    styleUrls: ['./syslog.component.scss']
})

export class SyslogComponent implements OnInit {
    columns = ['id', 'name', 'login date', 'logout date'];
    userLogData = [
        {'id': 1, 'name': 'alan', 'login_date': '2020/12/31 15:12:33', 'logout_date': '2021/01/01 15:12:33'},
        {'id': 2, 'name': 'alan2', 'login_date': '2020/12/31 19:12:53', 'logout_date': '2021/01/04 11:12:33'}
    ];
    columnName: string = 'id';
    order: string = 'asc';

    constructor(
        private chartServie: ChartService
    ) {}

    ngOnInit(): void {
        this.chartServie.drawSineCurve('chart-svg', {
            width: 1500, height: 400
        });
    }

    sortByColumnName(columnName: string) {
        this.columnName = columnName;

        if (this.order === 'desc') {
            this.userLogData.reverse();
            this.order = 'asc';
        } else {
            this.order = 'desc';
        }
    }
}
