import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  wishlistName: any;

  constructor(private dialogRef: MatDialogRef<EditDialogComponent>, 
             @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    console.log('save');
  }

}
