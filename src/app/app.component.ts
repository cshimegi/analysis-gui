import { Component, OnInit } from '@angular/core';

import { AccountService } from '@app/_services_';
import { User } from '@app/_models_';

declare var $: any;

@Component({
    // selector: 'app-root',
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'analysis-web';
    user: User;

    ngOnInit() {
        $(function () {
            $('#sidebar-collapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
    }

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}
