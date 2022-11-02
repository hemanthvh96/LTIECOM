import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>,
              private wishlistService: WishlistService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    this.wishlistService.deleteWishlist(this.data).subscribe(res => {
      this.dialogRef.close(res);
    })
  }

}
