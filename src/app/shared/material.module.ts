import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [],
    exports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatTabsModule, 
             MatFormFieldModule, MatSelectModule, MatTableModule, MatDialogModule]
})

export class MaterialModule {

}