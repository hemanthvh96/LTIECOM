import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  wishlistName: any;

  constructor(private dialogRef: MatDialogRef<EditDialogComponent>,
              private wishlistService: WishlistService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.wishlistName = this.data.name.name;
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    let user = { ...JSON.parse(localStorage.getItem('user') as string) };
    let request = {
      'name' : this.wishlistName,
      'uuid' : this.data.name.uuid,
      'customer_uuid' : user.customerUuid
    }
    this.wishlistService.updateWishlist(request).subscribe(res => {
       this.dialogRef.close(res);
    })
    // this.dialogRef.close();
  }

}
