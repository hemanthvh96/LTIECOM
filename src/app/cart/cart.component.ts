import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>;
  cartItems: any[] = [];
  user;
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
    if (!localStorage.getItem('Auth_Token')) {
      this.router.navigate(['/'])
    }
    this.user = { ...JSON.parse(localStorage.getItem('user') as string) };
    this.getAllCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.cartItems.forEach(element => {
      this.total = this.total + element.price * element.quantity;
    });
  }

  quantityChange(element) {
    // this.total = 0;
    // this.cartItems.forEach(element => {
    //   this.total = this.total + element.price * element.quantity;
    // });
    let request = {
      "productname": element.productname,
      "description": element.description,
      "quantity": element.quantity,
      "price": element.price,
      "totalprice": element.totalprice,
      "uuid": element.uuid,
      "category": element.category
    }
    this.cartService.updateCartProduct(request).subscribe(res => {
      this.getAllCartItems();
    })
  }

  getAllCartItems() {
    let params = this.user.customerUuid;
    //this.dataSource = [];
    this.cartItems = [];
    this.cartService.getAllCartProducts(params).subscribe(res => {
      this.cartItems = Object.values(res);
      this.cartItems = this.cartItems.sort((a, b) => (a.productname < b.productname ? -1 : 1));
      this.dataSource = new MatTableDataSource(this.cartItems);
      this.dataSource.paginator = this.paginator;
      this.calculateTotal();
      // this.cartItems.forEach(element => {
      //   this.dataSource.push(element);
      // });

    });
  }

  deleteCartItem(index: any) {
    let params = index.uuid;
    this.cartService.deleteProductFromCart(params).subscribe(res => {
      this.getAllCartItems();
      this.openDeleteSnackbar('Product deleted successfully!', 'Close')
    })
  }

  emptyCart() {
    let params = this.user.customerUuid;
    this.cartService.deleteAllProductsFromCart(params).subscribe(res => {
      if (res)
        this.cartItems = [];
    })
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  openDeleteSnackbar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 4000 });
    snackBarRef.afterDismissed().subscribe(() => {
    });
    snackBarRef.onAction().subscribe(() => {
    })
  }


  openSnackbar(message: string, action: string) {
    let username = this.user.firstName
    let msg = 'Hi ' + username + ', Your order has been placed successfully!';
    let snackBarRef = this.snackBar.open(msg, action, { duration: 4000 });
    this.cartItems = [];
    this.emptyCart();
    snackBarRef.afterDismissed().subscribe(() => {
    });
    snackBarRef.onAction().subscribe(() => {
    })
  }

}
