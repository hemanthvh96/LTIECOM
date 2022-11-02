import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  //@ViewChild(MatPaginator) paginator: MatPaginator; 
  //wishListProducts : any = [];
  wishListProducts = new MatTableDataSource<any>;
  // dataSource =  new MatTableDataSource(this.wishListProducts);
  dataSource: any = [];
  selectedList: any;
  listDetails: any;

  wishlists: any[] = [];
  wishlistNames: any[] = [];
  //dataSource = new MatTableDataSource<>;
  displayedColumns: string[] = ['image', 'name', 'price', 'details', 'action'];
  //dataSource: any[] = [];

  constructor(public dialog: MatDialog, private wishlistService: WishlistService,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('Auth_Token')) {
      this.router.navigate(['/']);
    }
    this.getAllWishList();
  }

  ngAfterViewInit(): void {
    this.wishListProducts = new MatTableDataSource();
    // this.dataSource.paginator = this.paginator;  // <-- STEP (4)
    this.wishListProducts.paginator = this.paginator;
    //this.dataSource.push(this.paginator);
  }

  openDeleteDialog() {
    let params = this.listDetails.uuid;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: params,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedList = '';
        this.getAllWishList();
        this.openSnackbar('Wishlist deleted successfully', 'Close');
      }
    });
  }

  openEditDialog() {
    let data = {
      name: this.selectedList,
      uuid: this.listDetails.uuid,
      customer_uuid: '5e86726f-56b2-11ed-b473-112c4e60a292'
    }
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.wishlistNames = [];
      if (result) {
        this.selectedList = '';
        this.getAllWishList();
        //this.selectedList = result.name;
        this.openSnackbar('Wishlist updated successfully', 'Close');
      }
      //this.listDetails = result;
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedList = '';
        this.getAllWishList();
        this.openSnackbar('Wishlist added successfully', 'Close');
      }
    });
  }

  getAllWishList() {
    //let params = '5e86726f-56b2-11ed-b473-112c4e60a292';
    let user = { ...JSON.parse(localStorage.getItem('user') as string) };
    let params = user.customerUuid;
    this.wishlistService.getAllWishlists(params).subscribe(res => {
      this.wishlistNames = [];
      this.wishlists = [];
      this.wishlists = Object.values(res);
      this.wishlists.forEach(element => {
        this.wishlistNames.push(element.name);
      });
    })

  }

  valueChanged() {
    if (this.selectedList) {
      this.getAllWishListProducts(this.selectedList);
    }
  }

  getAllWishListProducts(listSelected: any) {
    //this.dataSource = [];
    this.listDetails = listSelected;
    this.dataSource = listSelected.wishlistProduct;
    //this.selectedList = listSelected.name
    this.wishListProducts = new MatTableDataSource(listSelected.wishlistProduct)
    this.wishListProducts.paginator = this.paginator;
    //this.wishListProducts = listSelected.wishlistProduct;
    //this.dataSource = new MatTableDataSource(this.wishListProducts)
    this.dataSource.paginator = this.paginator;
    //this.dataSource = this.wishListProducts;
    //this.selectedList = listSelected.name;
  }

  removeProduct(index: any) {
    let params = index.uuid;
    this.wishlistService.removeProductFromWishlist(params).subscribe(res => {
      this.getWishListProductByList(this.selectedList)
    })
  }

  getWishListProductByList(listSelected: any) {
    let params = listSelected.uuid;
    this.wishlistService.getWishlistProductsByListId(params).subscribe(res => {
      let data = Object.values(res);
      this.dataSource = data[3];
      this.wishListProducts = new MatTableDataSource(this.dataSource);
      this.wishListProducts.paginator = this.paginator;
    })
  }

  openSnackbar(message: string, action: string) {
    //let username = this.user.firstName
    // let msg = 'Hi ' + username + ', Your order has been placed successfully!'; 
    let snackBarRef = this.snackBar.open(message, action, { duration: 1000 });
    //this.cartItems = [];
    //this.emptyCart();
    snackBarRef.afterDismissed().subscribe(() => {
    });
    snackBarRef.onAction().subscribe(() => {
    })
  }

}
