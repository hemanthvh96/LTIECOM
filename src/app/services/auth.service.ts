import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';

export interface User {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password?: string,
    customerUuid?: string
}


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient, private router: Router) {
        const token = localStorage.getItem('Auth_Token');
        this.isLoggedIn$.next(!!token);
    }

    public user!: User;
    private isLoggedIn$ = new BehaviorSubject<boolean>(false);
    public isUserLoggedIn$ = this.isLoggedIn$.asObservable();

    registerUser(user: User) {
        return this.http.post('http://localhost:8080/customers/register-customer', user);
    }

    signinUser(username: string, password: string) {
        return this.http.post('http://localhost:8080/customers/authenticate_user', { username, password }, { observe: 'response' }).pipe(map(res => {
            const jwt = res.headers.get('jwtToken') as string;
            localStorage.setItem('Auth_Token', jwt);
            localStorage.setItem('user', JSON.stringify(res.body));
            this.isLoggedIn$.next(true);
            return res;
        }))
    }

    logout() {
        this.user = null as any;
        ['Auth_Token', 'user'].forEach(el => {
            localStorage.removeItem(el);
        });
        this.isLoggedIn$.next(false);
        this.router.navigate(['/']);
    }
}