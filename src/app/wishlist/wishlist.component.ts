import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
 // @ViewChild('paginator') paginator!: MatPaginator;
  //@//ViewChild(MatPaginator) paginator: MatPaginator; 
 // @ViewChild ('paginator') dataSource = new MatTableDataSource<Element>;
  selectedList: any;
  listDetails: any;
  wishlists: any[] = [];
  wishlistNames: any[] = [];
  //dataSource = new MatTableDataSource<>;
  displayedColumns: string[] = ['image', 'name', 'price', 'details','action'];
  dataSource: any[] = [];

  constructor(public dialog: MatDialog, private wishlistService: WishlistService) { }

  ngOnInit(): void {
     this.getAllWishList();
  }

  ngAfterViewInit(): void {
   //this.dataSource.paginator = this.paginator;  // <-- STEP (4)
   //this.dataSource.push(this.paginator);
}

  openDeleteDialog(){
    let params = this.listDetails.uuid;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: params,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedList = '';
      this.getAllWishList();
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
     // this.wishlistNames = [];
      console.log(result);
      this.getAllWishList();
      this.selectedList ='';
      //this.listDetails = result;
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllWishList();
    });
  }

  getAllWishList(){
    let params = '5e86726f-56b2-11ed-b473-112c4e60a292';
    this.wishlistService.getAllWishlists(params).subscribe(res => {
      this.wishlistNames = [];
      this.wishlists = [];
      this.wishlists = Object.values(res);
      this.wishlists.forEach(element => {
        this.wishlistNames.push(element.name);
      });
      console.log(this.wishlistNames)    
    })
  }

  valueChanged(){
    console.log(this.selectedList);
    console.log('inside chnage')
    if(this.selectedList){
      this.getAllWishListProducts(this.selectedList);
    }
  }

  getAllWishListProducts(listSelected : any){
    this.dataSource = [];
    this.listDetails = listSelected;
    this.dataSource = listSelected.wishlistProduct;
    //this.selectedList = listSelected.name;
    console.log(this.dataSource)
  }

  removeProduct(index : any){
    console.log(index);
    let params = index.uuid;
    this.wishlistService.removeProductFromWishlist(params).subscribe(res => {
      console.log(res);
      console.log(this.selectedList)
      this.getWishListProductByList(this.selectedList)
    })
  }

  getWishListProductByList(listSelected: any){
    let params = listSelected.uuid;
    this.dataSource = [];
    this.wishlistService.getWishlistProductsByListId(params).subscribe(res => {
     // console.log(res.wishlistProduct);
      console.log(res);
      let data =res;
      //this.dataSource = data.wishlistProduct;
      console.log(this.dataSource)
    })
    console.log(this.dataSource)
  }

}
