import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  user!: User
  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
    }
  }

  getAllWishlists(params: any) {
    return this.http.get('http://localhost:8080/wishlist/findbycustomeruuid/' + encodeURIComponent(params));
  }

  createNewWishlist(request: any) {
    return this.http.post('http://localhost:8080/wishlist/add', request)
  }

  updateWishlist(request: any) {
    return this.http.put('http://localhost:8080/wishlist/update', request)
  }

  deleteWishlist(params: any) {
    return this.http.delete('http://localhost:8080/wishlist/delete/' + encodeURIComponent(params), { responseType: 'text' })
  }

  getAllWishlistProducts() {
    return this.http.get('http://localhost:8080/wishlistproduct/findall');
  }

  removeProductFromWishlist(params: any) {
    return this.http.delete('http://localhost:8080/wishlistproduct/delete/' + encodeURIComponent(params), { responseType: 'text' });
  }

  getWishlistProductsByListId(params: any) {
    return this.http.get('http://localhost:8080/wishlistproduct/findbyuuid/' + encodeURIComponent(params))
  }

  createWishlistProduct(wishlist_Product: any) {
    return this.http.post('http://localhost:8080/wishlistproduct/add', wishlist_Product)
  }


}
