import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Product {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
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
}