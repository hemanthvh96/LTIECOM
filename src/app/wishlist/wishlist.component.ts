import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WishlistService } from '../services/wishlist.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

// export interface WishlistData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  //@ViewChild('paginator') paginator!: MatPaginator;
  //@ViewChild(MatPaginator) private paginator: MatPaginator; 
  selectedList: any;
  listDetails: any;
  wishlists: any[] = [];
  wishlistNames: any[] = [];
  // wishlists = [
  //   {value: '1', viewValue: 'First'},
  //   {value: '2', viewValue: 'Second'},
  //   {value: '3', viewValue: 'Third'},
  // ];
  displayedColumns: string[] = ['image', 'name', 'price', 'details','action'];
  dataSource = [
       {name: 'P1', price: 100, details: 'abc'},
       {name: 'P2', price: 200, details: 'pqr'},
       {name: 'P3', price: 300, details: 'xyz'}
     ];

  constructor(public dialog: MatDialog, private wishlistService: WishlistService) { }

  ngOnInit(): void {
     this.getAllWishList();
  }

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;  // <-- STEP (4)
}

  openDeleteDialog(){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(){
    let data = {
      name : this.selectedList,
      uuid : this.listDetails.uuid,
      customer_uuid : '5e86726f-56b2-11ed-b473-112c4e60a292'
    }
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getAllWishList(){
    let params = '5e86726f-56b2-11ed-b473-112c4e60a292';
    this.wishlistService.getAllWishlists(params).subscribe(res => {
      console.log(res)
      console.log(this.wishlists);
      this.wishlistNames = [];
      this.wishlists = [];
      this.wishlists = Object.values(res);
      this.wishlists.forEach(element => {
        console.log(element)
        this.wishlistNames.push(element.name);
        console.log(this.wishlists)
      });
     
    })
  }

  valueChanged(){
    console.log(this.selectedList);
    if(this.selectedList){
      this.getAllWishListProducts(this.selectedList);
    }
  }

  getAllWishListProducts(listSelected : any){
    this.dataSource = [];
    this.listDetails = listSelected;
    this.dataSource = listSelected.wishlistProduct;
    console.log(this.dataSource)
    // this.wishlistService.getAllWishlistProducts().subscribe(res => {
    //   console.log(res)
      // console.log(this.wishlists);
      // this.wishlists = [];
      // var WishlistName = Object.values(res);
      // WishlistName.forEach(element => {
      //   console.log(element)
      //   this.wishlists.push(element.name);
      //   console.log(this.wishlists)
      // });
     
  }

  removeProduct(index : any){
    console.log(index);
    let params = index.uuid;
    this.wishlistService.removeProductFromWishlist(params).subscribe(res => {
      console.log(res);
      console.log(this.selectedList)
      this.getAllWishListProducts(this.selectedList)
    })
  }

}
