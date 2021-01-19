import { Component, OnInit } from '@angular/core';
import { ChartService, AccountService, DateService } from '@app/_services_';
import { UserLog } from '@app/_models_';
import { map } from 'rxjs/operators';

declare var $: any;
@Component({
    selector: 'app-syslog',
    templateUrl: './syslog.component.html',
    styleUrls: ['./syslog.component.scss']
})

export class SyslogComponent implements OnInit {
    columns = ['id', 'name', 'authority', 'loggedTime'];
    userLogs: UserLog[] = [];
    sortColumn: string = 'id';
    order: string = 'asc';

    constructor(
        private chartServie: ChartService,
        private accountService: AccountService,
        private dateService: DateService
    ) {}

    ngOnInit(): void
    {
        this.accountService.getAllUserLogs()
            .pipe(
                map(logs => logs.map(log => {
                    log.user.authorityName = this.accountService.getAuthorityName(log.user.authority);
                    log.loggedTime = log['logged_time'];

                    delete log['logged_time'];

                    return log as UserLog
                }))
            ).subscribe(logs => {
                this.userLogs = logs;
                this.drawLineChart();
            });
    }

    /**
     * Draw line chart of user activity
     */
    drawLineChart(): void
    {
        let accessData = this.getAccessAmountFromUserLog();
        const data = {
            labels: accessData.map(x => x.datetime),
            datasets: [{
                labels: [],
                fill: false, // don't fill underneath line
                borderColor: '#FF5376', // line color
                borderWidth: 3, // 
                pointRadius: 5,
                pointHoverRadius: 10,
                data: accessData.map(x => x.amount)
            }]
        };
        this.chartServie.initCanvas('chart-canvas')
            .setData(data)
            .setOptions({
                title:{
                    display: true,
                    text: 'User Activity',
                    position: 'top',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontFamily: 'Century Gothic'
                },
                legend: {
                    display: false
                },
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 1
                        }
                    }]
                }
            })
            .createLineChart();
    }

    /**
     * Sort table data by column name
     * 
     * @param columnName 
     */
    sortByColumnName(columnName: string): void
    {
        $(this.sortColumn).removeClass(this.order);
        this.sortColumn = columnName;
        this.order = this.order === 'desc' ? 'asc' : 'desc';
        $(this.sortColumn).addClass(this.order);
    }

    /**
     * 
     * @returns results
     */
    private getAccessAmountFromUserLog(): Array<any>
    {
        let data = this.userLogs.map(function (userLog) {
            return {
                name: userLog.user.username,
                datetime: userLog.loggedTime
            }
        });

        return this.dateService.countAmountPerDay(data);
    }
}
