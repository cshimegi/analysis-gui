import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MATERIAL_MODULES, DATE_FORMATS } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SyslogComponent } from './syslog/syslog.component';
import { AboutComponent } from './about/about.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { VechainComponent } from './vechain/vechain.component';
import { ScrapyComponent } from './scrapy/scrapy.component';

import { OrderBy } from './_pipes_/orderBy.pipe';
import { Replace } from './_pipes_/replace.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@app/_helpers_';
import { ErrorComponent } from './error/error.component';
import { CalendarComponent } from '@app/dialogs';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        RegisterComponent,
        SyslogComponent,
        AboutComponent,
        VechainComponent,
        ScheduleComponent,
        OrderBy,
        Replace,
        ErrorComponent,
        ScrapyComponent,
        CalendarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FullCalendarModule,
        ...MATERIAL_MODULES
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: DATE_FORMATS
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        CalendarComponent
    ]
})

export class AppModule {}
