import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  getAllWishlists() {
    //let header = new HttpHeaders("Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc3NpZ25tZW50IiwiaWF0IjoxNjY2OTQyMzYxLCJleHAiOjE2NjY5NDQxNjF9.GslHx0vf7YHE7PLsHk90FsEImx2Ygipx5TfnSzwKVQdcBp76Eg4bSBTGfccHqEc54XOJKZMO4SJ7LIoqsRQjSw");
    //var header = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc3NpZ25tZW50IiwiaWF0IjoxNjY2OTQyMzYxLCJleHAiOjE2NjY5NDQxNjF9.GslHx0vf7YHE7PLsHk90FsEImx2Ygipx5TfnSzwKVQdcBp76Eg4bSBTGfccHqEc54XOJKZMO4SJ7LIoqsRQjSw"
    var headers = new HttpHeaders();
    //var options ={headers: new Headers()}
    //options.headers.set('Authorization', 'header')
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc3NpZ25tZW50IiwiaWF0IjoxNjY2OTQ1MDAxLCJleHAiOjE2NjY5NDY4MDF9.-OWCrSfR5XC9MgzoRETRzr6bCA9Bb7hCSV4IHx18Sw2rCTKm-eabiig85jzo_g3QzbzyzgOzjF6YfQC6OYfBOA')
   console.log(headers)
    return this.http.get('http://localhost:8080/wishlist/findall', {headers : headers});
 }

}
