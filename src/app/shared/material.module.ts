import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [],
    exports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, MatCheckboxModule, MatSliderModule, MatMenuModule]
})

export class MaterialModule {

}