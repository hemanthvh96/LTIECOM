import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    isUserLoggedIn!: boolean;
    user!: User;
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.isUserLoggedIn$.subscribe(value => {
            this.isUserLoggedIn = value;
            this.user = { ...JSON.parse(localStorage.getItem('user') as string) };
        })
    }

    onLogout() {
        this.authService.logout();
    }
}