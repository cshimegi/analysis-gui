import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '@app/_services_';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const IsFromLogin = request.body && request.body.hasOwnProperty('isLogin') ? request.body.isLogin : false;
        const IsFromRegister = request.body && request.body.hasOwnProperty('isRegister') ? request.body.isRegister : false;

        if (!IsFromLogin && !IsFromRegister) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.getToken()}`
                }
            });
        }

        return next.handle(request);
    }
}