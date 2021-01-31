import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChartService, AccountService, DateService } from '@app/_services_';
import { UserLog } from '@app/_models_';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

declare var $: any;
@Component({
    selector: 'app-syslog',
    templateUrl: './syslog.component.html',
    styleUrls: ['./syslog.component.scss']
})

export class SyslogComponent implements AfterViewInit, OnInit {
    @ViewChild('sortTable') sortTable: MatSort;
    @ViewChild('paginator') paginator: MatPaginator;

    loading: boolean = true;
    columns = ['id', 'username', 'authority', 'loggedTime'];
    userLogs: UserLog[] = [];
    userLogDataSource: MatTableDataSource<UserLog>;
    currentSort: Sort;
    count: number|null;
    fromDate: number;
    currentPage: PageEvent;

    constructor(
        private chartServie: ChartService,
        private accountService: AccountService,
        private dateService: DateService
    ) {
        this.currentSort = {
            active: 'id',
            direction: 'desc'
        };
        this.currentPage = {
            pageIndex: 0,
            pageSize: 9,
            length: null
        }
        this.fromDate = this.dateService.getUnixDatetime(this.dateService.getStringPastDatetime(30));
    }

    ngOnInit(): void
    {
        this.getLogs();
    }

    ngAfterViewInit(): void
    {
        this.sortTable.sortChange.subscribe((sort: Sort) => {
            this.currentSort = sort;
            this.getLogs();
        });
        this.paginator.page.subscribe((page: PageEvent) => {
            this.currentPage = page;
            this.getLogs();
        });
    }

    /**
     * 
     */
    getLogs(): void
    {
        const params = this.getQueryParams();

        this.accountService.getUserLogs(this.currentPage.pageIndex, params)
            .subscribe((data: any) => {
                this.count = data.count;
                const logs = this.formatResults(data.results);
                this.loading = false;
                this.userLogs = logs;
                this.userLogDataSource = new MatTableDataSource(logs);
                this.drawLineChart();
            });
    }

    /**
     * 
     */
    private formatResults(results: any): UserLog[]
    {
        return results.map(log => {
            log.user.authorityName = this.accountService.getAuthorityName(log.user.authority);
            log.loggedTime = log['logged_time'];

            delete log['logged_time'];

            return log as UserLog
        });
    }

    private getQueryParams(): any
    {
        return {
            'orderBy': this.currentSort.active,
            'order': this.currentSort.direction,
            'fromDate': this.fromDate
        };
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
     * 
     * @returns results
     */
    private getAccessAmountFromUserLog(): Array<any>
    {
        const data = this.userLogs.map(function (userLog) {
            return {
                name: userLog.user.username,
                datetime: userLog.loggedTime
            }
        }).reverse(); // since data is for line chart

        return this.dateService.countAmountPerDay(data);
    }

}