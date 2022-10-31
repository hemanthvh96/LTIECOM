import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 

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

  constructor(private cartService: CartService, private router: Router,
              private snackBar: MatSnackBar) { }

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
    let params = 'eed91db8-575b-11ed-9ab3-b33a65785306';
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

  emptyCart(){
    let params = 'eed91db8-575b-11ed-9ab3-b33a65785306';
    this.cartService.deleteAllProductsFromCart(params).subscribe(res => {
      console.log(res);
      if(res)
        this.dataSource = [];
    })
  }

  goToProducts(){
    this.router.navigate(['/products']);
  }

  openSnackbar(message:string, action:string) {
    let snackBarRef = this.snackBar.open(message, action);
    this.dataSource = [];
    snackBarRef.afterDismissed().subscribe(() => {
      //console.log("The snackbar is dismissed");
    });
    snackBarRef.onAction().subscribe(() => {
      //console.log("The snackbar action was triggered!");
    })
  }

}
