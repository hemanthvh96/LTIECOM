import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userName: any;
  password: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(loginForm: NgForm) {
    const loginDetails = { username: loginForm.controls['username'].value, password: loginForm.controls['password'].value };

    this.authService.signinUser(loginDetails.username, loginDetails.password)
  }

}
