import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Product {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
}

export interface ProductReal {
    uuid: string,
    name: string,
    category: string,
    description: string,
    price: number,
    rating: number,
    imagesrc: string
}

@Injectable({
    providedIn: 'root'
})

export class ProductsService {

    products: any = [];
    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get('https://fakestoreapi.com/products/');
    }

    getRealProducts() {
        //const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc3NpZ25tZW50IiwiaWF0IjoxNjY2OTM1MzUyLCJleHAiOjE2NjcwMjE3NTJ9.obHwE6GI_C8cmMEkVt0uyhD6XUaNEsseIb4coRf8fwrI404IOvaJGjTYtzxXYIOWkBeKh0I4Hpv9FQlShA0ZMg')
        return this.http.get('http://localhost:8080/products/findall')
    }
}