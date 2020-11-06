import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StatusCodes } from 'http-status-codes';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/_models_';

@Injectable({ providedIn: 'root' })

export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    /**
     * 
     * @returns User
     */
    public get userValue(): User {
        return this.userSubject.value;
    }

    /**
     * Login action
     * 
     * @param username 
     * @param password 
     * @returns Error|User
     */
    login(username: string, password: string) {
        let payload = {
            name: username,
            password: password
        };
        
        return this.http.post<Error|User>(`${environment.apiUrl}/user/login`, payload)
            .pipe(map((data: any) => {
                if (data.code === StatusCodes.BAD_REQUEST || 
                    data.code === StatusCodes.INTERNAL_SERVER_ERROR)
                {
                    return Error(data.eror);
                }

                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(data.user));
                this.userSubject.next(data.user);
                
                return data.user;
            }));
    }

    /**
     * Logout action
     */
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Register action
     * 
     * @param user Object
     */
    register(user: Object) {
        return this.http.post(`${environment.apiUrl}/user/register`, user);
    }

    /**
     * Get all users
     */
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/user`);
    }

    /**
     * Get user by id
     * 
     * @param id user id
     */
    getById(id: bigint) {
        return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
    }
    
    /**
     * Update user action with all fields
     * 
     * @param id user id
     * @param params all parameters for updating
     */
    update(id: bigint, params: any) {
        return this.http.put(`${environment.apiUrl}/user/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id === this.userValue.id) {
                    // update local storage
                    const user = {...this.userValue, ...params};

                    localStorage.setItem('user', JSON.stringify(user));
                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }

                return x;
            }));
    }

    /**
     * Update user action with partial fields
     * 
     * @param id user id
     * @param params only parameters for updating
     */
    partialUpdate(id: bigint, params: any) {
        return this.http.patch(`${environment.apiUrl}/user/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id === this.userValue.id) {
                    // update local storage
                    const user = {...this.userValue, ...params};
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }

                return x;
            }));
    }

    /**
     * Delete user by id
     * 
     * @param id user id
     */
    delete(id: bigint) {
        return this.http.delete(`${environment.apiUrl}/user/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id === this.userValue.id) {
                    this.logout();
                }

                return x;
            }));
    }
}