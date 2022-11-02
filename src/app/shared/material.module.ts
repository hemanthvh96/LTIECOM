import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
    declarations: [],
    exports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatTabsModule,
        MatFormFieldModule, MatSelectModule, MatTableModule, MatDialogModule, MatCardModule,
        MatPaginatorModule, MatCheckboxModule, MatSliderModule, MatMenuModule, MatSnackBar]
})

export class MaterialModule {

}