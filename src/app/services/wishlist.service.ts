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

  createNewWishlist(request: any){
    return this.http.post('http://localhost:8080/wishlist/add',request)
  }

  updateWishlist(request: any){
    return this.http.put('http://localhost:8080/wishlist/update',request)
  }

  deleteWishlist(params: any){
    return this.http.delete('http://localhost:8080/wishlist/delete/' + encodeURIComponent(params),{responseType: 'text'})
  }

  getAllWishlistProducts() {
  return this.http.get('http://localhost:8080/wishlistproduct/findall');
  }

  removeProductFromWishlist(params: any){
    return this.http.delete('http://localhost:8080/wishlistproduct/delete/' + encodeURIComponent(params),{responseType: 'text'});
  }

  getWishlistProductsByListId(params : any){
    return this.http.get('http://localhost:8080/wishlistproduct/findbyuuid/' + encodeURIComponent(params))
  }
 

}
