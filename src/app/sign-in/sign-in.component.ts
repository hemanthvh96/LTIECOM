import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userName: any;
  password: any;
  @Output() selectedIndex = new EventEmitter<string>();

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  signUp(){
    let value='1'
    this.selectedIndex.emit(value);
  }

}
