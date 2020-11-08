import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers_';
// 
import { LoginComponent } from '@app/login';
import { RegisterComponent } from '@app/register';
// 
import { DashboardComponent } from '@app/dashboard';
import { AboutComponent } from '@app/about';
import { ScheduleComponent } from '@app/schedule';
import { MonitorComponent } from '@app/monitor';
import { SyslogComponent } from '@app/syslog';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
    { path: 'monitor', component: MonitorComponent, canActivate: [AuthGuard] },
    { path: 'log', component: SyslogComponent, canActivate: [AuthGuard] },
    // otherwise redirect to dashboard
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
