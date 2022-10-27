import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dataSource = [
    {name: 'P1', details: 'abc', quantity: 2, price: 100},
    {name: 'P2', details: 'pqr', quantity: 4, price: 300},
    {name: 'P2', details: 'pqr', quantity: 4, price: 300},
    {name: 'P2', details: 'pqr', quantity: 4, price: 300},
    {name: 'P3', details: 'xyz', quantity: 1, price: 600}
  ];
  displayedColumns: string[] = ['name', 'details', 'quantity', 'price', 'total', 'action'];
  total: any;
  counter: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.calculateTotal();
  }

  // ngOnChanges(): void {
  //   this.calculateTotal();
  // }

  calculateTotal(){
   // this.dataSource[index].quantity = this.counter
    this.total = 0;
    this.dataSource.forEach(element => {
      this.total = this.total + element.price * element.quantity;
    });
    //console.log(this.dataSource[index])
    //console.log(index)
  }

}
