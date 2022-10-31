import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class AppDialog {

    constructor(public dialogRef: MatDialogRef<AppDialog>) { }

    onCreateWishlist(wishlistName: string) {
        this.dialogRef.close({ data: { wishlistName } });
    }
}