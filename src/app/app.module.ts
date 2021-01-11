import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SyslogComponent } from './syslog/syslog.component';
import { AboutComponent } from './about/about.component';
import { MonitorComponent } from './monitor/monitor.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { OrderBy } from './_pipes_/orderBy.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        RegisterComponent,
        SyslogComponent,
        AboutComponent,
        MonitorComponent,
        ScheduleComponent,
        OrderBy
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}
