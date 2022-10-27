import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product, ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})

export class ProductsComponent implements OnInit {

    products: any = [];
    categories: any[] = [];
    ratingsArr: any[] = [
        { rating: 4, checked: false },
        { rating: 3, checked: false },
        { rating: 2, checked: false },
        { rating: 1, checked: false },

    ];
    filterPrice: number = 30;
    wishlist = ['Hemanth Wishlist', 'Virat Wishlist', 'Kane Wishlist', 'Tom Cruise Wishlist'];
    selectedWishlist = [];

    constructor(private productsService: ProductsService) { }

    ngOnInit() {
        this.productsService.getProducts().subscribe(res => {
            this.products = res;
            console.log(this.products);
            this.categories = [...new Set(this.products.map((product: any) => product.category))];
        });
    }

    updateFilterPrice(event: any) {
        this.filterPrice = event.value;
    }

    wishlistHandler(event: any) {
        console.log(event)
    }

    finalProducts() {

    }

}