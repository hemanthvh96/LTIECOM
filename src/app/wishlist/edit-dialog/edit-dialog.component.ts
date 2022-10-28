import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  wishlistName: any;

  constructor(private dialogRef: MatDialogRef<EditDialogComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    console.log('save');
  }

}
