import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DateService, BarChartService } from '@app/_services_';
import { UserLog } from '@app/_models_';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRepositoryService, UserLogRepositoryService } from '@app/_repos_';

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
        private barChartServie: BarChartService,
        private userRepoService: UserRepositoryService,
        private userLogRepoService: UserLogRepositoryService,
        private dateService: DateService
    ) {
        this.currentSort = {
            active: 'id',
            direction: 'desc'
        };
        this.currentPage = {
            pageIndex: 0,
            pageSize: 6,
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

        this.userLogRepoService.getUserLogsBy(this.currentPage.pageIndex, params)
            .subscribe(
                (data: any) => {
                    this.count = data.count;
                    const logs = this.formatResults(data.results);
                    this.loading = false;
                    this.userLogs = logs;
                    this.userLogDataSource = new MatTableDataSource(logs);
                    this.userLogDataSource.paginator = this.paginator;
                    
                    this.drawBarChart();
                },
                (error: HttpErrorResponse) => {
                    console.error("Error => ", error);
                }
            );
    }

    /**
     * 
     */
    private formatResults(results: any): UserLog[]
    {
        return results.map(log => {
            log.user.authorityName = log.user.isStaff ? 'Admin' : 'General';
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
    drawBarChart(): void
    {
        const data = this.getAccessAmountFromUserLog();
        const options = {
            width: 1200,
            height: 300
        };

        this.barChartServie
            .setOptions(options)
            .setViewBox()
            .setData(data)
            .createSvg("user-log")
            .initRootLayer()
            .initAxisLayer()
            .initTimeAxisX(true)
            .initAmountAxisY(true)
            .initRectLayer()
            .addTitle(this.getChartTitleOptions())
            .addAxisXLabel(this.getAxisXLabelOptions())
            .addAxisYLabel(this.getAxisYLabelOptions())
            .drawAmountTimeChart()
    }

    private getChartTitleOptions (): any
    {
        return {
            styles: {
                "text-anchor": "middle",
                "font-weight": "bold"
            },
            content: "User Access"
        }
    }

    private getAxisXLabelOptions (): any
    {
        return {
            attrs: {
                dx: "1em"
            },
            styles: {
                "text-anchor": "middle",
                "font-weight": "bold"
            },
            content: "Date"
        };
    }

    private getAxisYLabelOptions (): any
    {
        return {
            styles: {
                "text-anchor": "middle",
                "font-weight": "bold"
            },
            content: "Nums"
        };
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