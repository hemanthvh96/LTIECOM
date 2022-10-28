import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  getAllWishlists(params: any) {
    return this.http.get('http://localhost:8080/wishlist/findbycustomeruuid/' + encodeURIComponent(params));
  }

  getAllWishlistProducts() {
  return this.http.get('http://localhost:8080/wishlistproduct/findall');
  }

  createNewWishlist(request: any){
    return this.http.post('http://localhost:8080/wishlist/add',{request})
  }

  removeProductFromWishlist(params: any){
    return this.http.delete('http://localhost:8080/wishlistproduct/delete/' + encodeURIComponent(params));
  }
 

}
