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
        return this.http.get('http://localhost:8080/products/findall')
    }
}