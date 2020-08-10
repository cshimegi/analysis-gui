import { Component, OnInit } from '@angular/core';

import { User } from '@app/_models_';
import { AccountService } from '@app/_services_';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit(): void {
    }

}
