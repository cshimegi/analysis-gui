import { Component, OnInit } from '@angular/core';
import { ChartService, AccountService } from '@app/_services_';
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
    userLogs: UserLog[];
    sortColumn: string = 'id';
    order: string = 'asc';

    constructor(
        private chartServie: ChartService,
        private accountService: AccountService
    ) {
        this.accountService.getAllUserLogs()
            .pipe(
                map(logs => logs.map(log => {
                    log.user.authorityName = this.accountService.getAuthorityName(log.user.authority);
                    log.loggedTime = log['logged_time'];

                    delete log['logged_time'];

                    return log as UserLog
                }))
            ).subscribe(logs => this.userLogs = logs);
    }

    ngOnInit(): void {
        this.chartServie.drawSineCurve('chart-svg', {
            width: 1500, height: 400
        });
    }

    /**
     * Sort table data by column name
     * 
     * @param columnName 
     */
    sortByColumnName(columnName: string) {
        $(this.sortColumn).removeClass(this.order);
        this.sortColumn = columnName;
        this.order = this.order === 'desc' ? 'asc' : 'desc';
        $(this.sortColumn).addClass(this.order);
    }
}
