import { Component, OnInit } from '@angular/core';

import { User } from '@app/_models_';
import { AccountService } from '@app/_services_';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit(): void {
    }

}
