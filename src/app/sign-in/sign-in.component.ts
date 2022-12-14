import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userName: any;
  password: any;
  hide = true;
  @Output() selectedIndex = new EventEmitter<string>();
  incorrectData: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(loginForm: NgForm) {
    const loginDetails = { username: loginForm.controls['username'].value, password: loginForm.controls['password'].value };

    this.authService.signinUser(loginDetails.username, loginDetails.password).toPromise().then(res => {
      loginForm.resetForm();
      this.router.navigate(['/products']);
    }).catch(e => {
      if(e.error){
         this.incorrectData = true;
      }
    })
  }
  
  signUp() {
    let value = '1'
    this.selectedIndex.emit(value);
  }
}
