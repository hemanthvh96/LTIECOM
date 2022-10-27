import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  selectedIndex: any;

  constructor() {  }

  ngOnInit(): void {
  }


  selectIndex(selectedIndex: any){
     this.selectedIndex = selectedIndex;
  }

}
