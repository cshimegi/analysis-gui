import { Injectable } from '@angular/core';
import tokenNotExpired from 'jwt-decode';

@Injectable({ providedIn: 'root' })

export class AuthService {

    public getToken(): string|null {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.token : null;
    }

    public isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean indicating whether or not the token is expired
        return tokenNotExpired(token);
    }

}