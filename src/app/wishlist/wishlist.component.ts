import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  wishlists = [
    {value: '1', viewValue: 'First'},
    {value: '2', viewValue: 'Second'},
    {value: '3', viewValue: 'Third'},
  ];
  displayedColumns: string[] = ['name', 'price', 'details','action'];
  dataSource = [
       {name: 'P1', price: 100, details: 'abc'},
       {name: 'P2', price: 200, details: 'pqr'},
       {name: 'P3', price: 300, details: 'xyz'}
     ];
  // dataSource = [
  //   {name: 'P1', price: 100, details: 'abc'},
  //   {name: 'P2', price: 200, details: 'pqr'},
  //   {name: 'P3', price: 300, details: 'xyz'}
  // ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: '',
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

}
