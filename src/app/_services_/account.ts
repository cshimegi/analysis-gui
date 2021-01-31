import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StatusCodes } from 'http-status-codes';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User, UserLog } from '@app/_models_';

const API_URL = environment.apiUrl;
const AUTHORIT_LABELS = {1: 'General', 99: 'Admin'};

@Injectable({ providedIn: 'root' })

export class AccountService {
    private readonly userBaseApi: string = API_URL + "/user";
    private readonly userLoginApi: string = this.userBaseApi + "/login";
    private readonly userRegisterApi: string = this.userBaseApi + "/register";
    private readonly userLogApi: string = API_URL + "/user_log/";
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
     * User Getter
     * 
     * @returns User
     */
    public get userValue(): User
    {
        return this.userSubject.value;
    }

    /**
     * Login action
     * 
     * @param username 
     * @param password 
     * @returns Error|User
     */
    login(username: string, password: string)
    {
        let payload = {
            name: username,
            password: password,
            isLogin: true
        };
        
        return this.http.post<Error|User>(this.userLoginApi, payload)
            .pipe(
                map((data: any) => {
                    if (data.code !== StatusCodes.OK) {
                        return Error(data.error);
                    }

                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(data.user));
                    this.userSubject.next(data.user);
                    
                    return data.user;
                }),
                catchError(error => {
                    console.error(error);
                    return of([]);
                })
            );
    }

    /**
     * Logout action
     */
    logout()
    {
        // remove user from local storage and set current user to null
        localStorage.clear();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Register action
     * 
     * @param user Object
     */
    register(user: Object)
    {
        user['isRegister'] = true;
        return this.http.post(this.userRegisterApi, user);
    }

    /**
     * Get all users
     */
    getAll(): Observable<User[]>
    {
        return this.http.get<User[]>(this.userBaseApi);
    }

    /**
     * Get user by id
     * 
     * @param id user id
     */
    getById(id: bigint)
    {
        return this.http.get<User>(`${this.userBaseApi}/${id}`);
    }
    
    /**
     * Update user action with all fields
     * 
     * @param id user id
     * @param params all parameters for updating
     */
    update(id: bigint, params: any)
    {
        return this.http
            .put(`${this.userBaseApi}/${id}`, params)
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
    partialUpdate(id: bigint, params: any)
    {
        return this.http
            .patch(`${this.userBaseApi}/${id}`, params)
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
    delete(id: bigint)
    {
        return this.http
            .delete(`${this.userBaseApi}/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id === this.userValue.id) {
                    this.logout();
                }

                return x;
            }));
    }

    /**
     * Get user logs
     */
    getUserLogsFromDate(params: any): Observable<UserLog[]>
    {
        const options = {
            params: params
        };

        return this.http.get<UserLog[]>(this.userLogApi, options);
    }

    /**
     * Get user logs
     */
    getUserLogs(pageIndex: number, params: any): Observable<UserLog[]>
    {
        const options = {
            params: params
        };

        return this.http.get<UserLog[]>(
            this.userLogApi + `?page=${pageIndex+1}`,
            options
        );
    }

    /**
     * Get authority name by its value
     * 
     * @param authority 
     */
    getAuthorityName(authority: number): string
    {
        return AUTHORIT_LABELS[authority]
    }
}