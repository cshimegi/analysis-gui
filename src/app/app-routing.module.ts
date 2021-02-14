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
import { VechainComponent } from '@app/vechain';
import { SyslogComponent } from '@app/syslog';
import { ScrapyComponent } from '@app/scrapy';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
    { path: 'vechain', component: VechainComponent, canActivate: [AuthGuard] },
    { path: 'scrapy', component: ScrapyComponent, canActivate: [AuthGuard] },
    { path: 'log', component: SyslogComponent, canActivate: [AuthGuard] },
    // otherwise redirect to dashboard
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
