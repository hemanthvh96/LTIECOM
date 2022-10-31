import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dataSource : any[] = [];
  cartItems : any[] = [];
  // dataSource = [
  //   {name: 'P1', details: 'abc', quantity: 2, price: 100},
  //   {name: 'P2', details: 'pqr', quantity: 4, price: 300},
  //   {name: 'P2', details: 'pqr', quantity: 4, price: 300},
  //   {name: 'P2', details: 'pqr', quantity: 4, price: 300},
  //   {name: 'P3', details: 'xyz', quantity: 1, price: 600}
  // ];
  displayedColumns: string[] = ['name', 'details', 'quantity', 'price', 'total', 'action'];
  total: any;
  counter: number = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllCartItems();
    // this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    this.dataSource.forEach(element => {
      this.total = this.total + element.price * element.quantity;
    });
  }

  getAllCartItems(){
    let params = '5e86726f-56b2-11ed-b473-112c4e60a292';
    this.dataSource = [];
    this.cartItems = [];
    this.cartService.getAllCartProducts(params).subscribe(res => {
      console.log(res)
      this.cartItems = Object.values(res);
      this.cartItems.forEach(element => {
        this.dataSource.push(element);
      });
      this.calculateTotal();
    });
  }

  deleteCartItem(index:any){
     console.log(index)
     console.log(this.cartItems)
     let params = index.uuid;
     this.cartService.deleteProductFromCart(params).subscribe(res => {
      console.log(res);
      this.getAllCartItems();
     })
  }

}
