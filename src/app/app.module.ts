import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

import { SortPipe } from './shared/sort.pipe';
import { SignInComponent } from './sign-in/sign-in.component';
import { WishlistComponent } from './wishlist/wishlist.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './services/http.interceptor.service';
import { DeleteDialogComponent } from './wishlist/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './wishlist/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './wishlist/add-dialog/add-dialog.component';
import { CartComponent } from './cart/cart.component';
import { AppDialog } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    ProductsComponent,
    SortPipe,
    SignInComponent,
    WishlistComponent,
    LoginComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    AddDialogComponent,
    CartComponent,
    AppDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
