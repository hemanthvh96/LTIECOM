import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  wishlistName: any;

  constructor(private dialogRef: MatDialogRef<AddDialogComponent>, private wishlistService: WishlistService) 
    { }

  ngOnInit(): void {
    //  this.save();
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    let user = { ...JSON.parse(localStorage.getItem('user') as string) };
    var request = {
      'name' : this.wishlistName,
      'customer_uuid' : user.customerUuid
    }
    this.wishlistService.createNewWishlist(request).subscribe(res => {
      this.dialogRef.close(res);
    }) 
  }

}
