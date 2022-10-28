import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
}


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    user!: User;

    registerUser(user: User) {
        return this.http.post('http://localhost:8080/customers/register-customer', user);
    }

    signinUser(username: string, password: string) {
        return this.http.post('http://localhost:8080/customers/authenticate_user', { username, password }, { observe: 'response' });
    }
}