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
    var request = {
      'name' : this.wishlistName,
      'customer_uuid' : '5e86726f-56b2-11ed-b473-112c4e60a292'
    }
    this.wishlistService.createNewWishlist(request).subscribe(res => {
      console.log(res)
    })
    console.log('save');
  }

}
