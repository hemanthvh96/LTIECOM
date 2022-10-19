import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignupComponent } from './signup/signup.component';
import { DeleteDialogComponent } from './wishlist/delete-dialog/delete-dialog.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'wishlist', component: WishlistComponent,
      children: [{path: 'delete', component: DeleteDialogComponent}] }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})

export class AppRoutingModule {

}
