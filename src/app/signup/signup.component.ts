import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

    @Output() selectedIndex = new EventEmitter<string>();
    constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

    hide = true;
    ngOnInit(): void {

    }

    signupUser(signupForm: NgForm) {
        console.log(signupForm);
        const user: User = {
            firstName: signupForm.controls['firstname'].value,
            lastName: signupForm.controls['lastname'].value,
            username: signupForm.controls['username'].value,
            email: signupForm.controls['email'].value,
            password: signupForm.controls['password'].value
        }
        console.log(user);
        this.authService.registerUser(user).subscribe(res => {
            console.log(res);
            console.log("User created successfully")
            if (res) signupForm.resetForm();
            this._snackBar.open("User Registered Successfully !", "Done", {
                duration: 4000,
                verticalPosition: "top", 
                horizontalPosition: "center" 
            });
            let value = '0'
            this.selectedIndex.emit(value);
        })
    }

    login() {
        let value = '0'
        this.selectedIndex.emit(value);
    }

}