import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getAllCartProducts(params: any) {
    return this.http.get('http://localhost:8080/cartitem/findbycustomeruuid/' + encodeURIComponent(params));
  }

  deleteProductFromCart(params: any) {
    return this.http.delete('http://localhost:8080/cartitem/delete/' + encodeURIComponent(params),{responseType: 'text'});
  }

  deleteAllProductsFromCart(params: any) {
    return this.http.delete('http://localhost:8080/cartitem/deleteallbycustomeruuid/' + encodeURIComponent(params));
  }

  updateCartProduct(request: any) {
    return this.http.put('http://localhost:8080/cartitem/update', request)
  }

  addProductToCart(product: any) {
    return this.http.post('http://localhost:8080/cartitem/add', product);
  }

}
