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
  wishListProducts = new MatTableDataSource<any>;
  dataSource: any = [];
  selectedList: any;
  listDetails: any;

  wishlists: any[] = [];
  wishlistNames: any[] = [];
  displayedColumns: string[] = ['image', 'name', 'price', 'details', 'action'];

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
    this.wishListProducts.paginator = this.paginator;
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
        this.openSnackbar('Wishlist deleted successfully!', 'Close');
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
      if (result) {
        this.selectedList = '';
        this.getAllWishList();
        this.openSnackbar('Wishlist updated successfully!', 'Close');
      }
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
        this.openSnackbar('Wishlist added successfully!', 'Close');
      }
    });
  }

  getAllWishList() {
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
      this.getWishListProductByList(this.selectedList);
    }
  }

  getAllWishListProducts(listSelected: any) {
    this.listDetails = listSelected;
    this.dataSource = listSelected.wishlistProduct;
    this.wishListProducts = new MatTableDataSource(listSelected.wishlistProduct)
    this.wishListProducts.paginator = this.paginator;
    this.dataSource.paginator = this.paginator;
  }

  removeProduct(index: any) {
    let params = index.uuid;
    this.wishlistService.removeProductFromWishlist(params).subscribe(res => {
      this.getWishListProductByList(this.selectedList)
      this.openSnackbar('Product deleted successfully!', 'Close')
    })
  }

  getWishListProductByList(listSelected: any) {
    this.listDetails = listSelected;
    let params = listSelected.uuid;
    this.wishlistService.getWishlistProductsByListId(params).subscribe(res => {
      let data = Object.values(res);
      this.dataSource = data[3];
      this.wishListProducts = new MatTableDataSource(this.dataSource);
      this.wishListProducts.paginator = this.paginator;
    })
  }

  openSnackbar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 4000 });
    snackBarRef.afterDismissed().subscribe(() => {
    });
    snackBarRef.onAction().subscribe(() => {
    })
  }

}
