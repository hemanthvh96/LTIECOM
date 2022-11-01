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
  @ViewChild(MatPaginator) paginator: MatPaginator;
 //@ViewChild(MatPaginator) paginator: MatPaginator; 
  wishListProducts : any[] = [];
  dataSource =  new MatTableDataSource(this.wishListProducts);
  selectedList: any;
  listDetails: any;
  
  wishlists: any[] = [];
  wishlistNames: any[] = [];
  //dataSource = new MatTableDataSource<>;
  displayedColumns: string[] = ['image', 'name', 'price', 'details','action'];
  //dataSource: any[] = [];

  constructor(public dialog: MatDialog, private wishlistService: WishlistService) { }

  ngOnInit(): void {
     this.getAllWishList();
  }

  ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;  // <-- STEP (4)
   //this.dataSource.push(this.paginator);
}

  openDeleteDialog(){
    let params = this.listDetails.uuid;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: params,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.selectedList = '';
        this.getAllWishList();
      }
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
      if(result){
        this.selectedList = '';
        this.getAllWishList();
        //this.selectedList = result.name;
        
      }
      console.log(this.selectedList)
      //this.listDetails = result;
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px',
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.getAllWishList();
    });
  }

  getAllWishList(){
    //let params = '5e86726f-56b2-11ed-b473-112c4e60a292';
    let user = { ...JSON.parse(localStorage.getItem('user') as string) };
    let params = user.customerUuid;
    //console.log(user.customerUuid)
    this.wishlistService.getAllWishlists(params).subscribe(res => {
      console.log(res)
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
    //this.dataSource = [];
    this.listDetails = listSelected;
    //this.dataSource = listSelected.wishlistProduct;
    //this.selectedList = listSelected.name
    this.wishListProducts = listSelected.wishlistProduct;
    this.dataSource = new MatTableDataSource(this.wishListProducts)
    this.dataSource.paginator = this.paginator;
    //this.dataSource = this.wishListProducts;
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
    this.wishlistService.getWishlistProductsByListId(params).subscribe(res => {
      let data = Object.values(res);
      this.wishListProducts = data[3];
    })
  }

}
