import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Product, ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDialog } from '../dialog/dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})

export class ProductsComponent implements OnInit {

    filters: any = [{ 'ratingsArr': [] }, { 'price': '' }, { 'category': '' }];
    products: any = [{ "name": "Apple iPhone 12", "description": "iPhone 12 description", "price": 54990.0, "uuid": "f4b1fd39-d505-d784-c18e-5ebc63d016aa", "category": "Mobile", "rating": 4.5, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/q/8/f/apple-iphone-12-dummyapplefsn-original-imafwg8dbzv8vh7t.jpeg?q=70" }, { "name": "OnePlus Nord CE2 Lite 5G", "description": "OnePlus Nord CE2 Lite 5G description", "price": 35000.0, "uuid": "72274e90-c6ba-f341-8d7d-ad1fd45eb6f1", "category": "Mobile", "rating": 4.3, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/xif0q/mobile/9/x/u/-original-imagg2abzhxjckxu.jpeg?q=70" }, { "name": "POCO C31", "description": "POCO C31 description", "price": 18000.0, "uuid": "208fe491-a849-4299-cfcb-9a5b0bc8371b", "category": "Mobile", "rating": 3.7, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/ku4ezrk0/mobile/p/e/4/c31-mzb0a0jin-poco-original-imag7bzqxgdhgf2n.jpeg?q=70" }, { "name": "Realme C35", "description": "Realme C35 description", "price": 19000.0, "uuid": "3b490758-e7b7-30fc-dcd6-5977232573a4", "category": "Mobile", "rating": 4.1, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/l0fm07k0/mobile/y/g/i/-original-imagc7ryyhrrcgxh.jpeg?q=70" }, { "name": "vivo f19 Pro Plus", "description": "vivo f19 Pro Plus description", "price": 24000.0, "uuid": "af7b3fe5-04a8-e800-2db5-8613c85d40bb", "category": "Mobile", "rating": 3.9, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/kn97te80/mobile/p/m/9/f19-pro-5g-cph2213-oppo-original-imagfz38hbzjhkqx.jpeg?q=70" }, { "name": "Apple 2020 Macbook Air M1", "description": "Apple 2020 Macbook Air M1 description", "price": 94990.0, "uuid": "d48d6caf-717d-8d91-4c82-dfeeeb772c71", "category": "Laptop", "rating": 4.8, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/khdqnbk0/computer/s/2/g/apple-original-imafxfyqykyghjg6.jpeg?q=70" }, { "name": "HP Core i5 12th Gen", "description": "HP Core i5 12th Gen description", "price": 64990.0, "uuid": "5d6630f9-6309-2b7c-6fe2-f4f704c06a97", "category": "Laptop", "rating": 4.5, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/d/r/e/15s-fq5111tu-thin-and-light-laptop-hp-original-imagha3x4gbfwsdx.jpeg?q=70" }, { "name": "ASUS TUF Gaming F15 Core i5 10th Gen", "description": "ASUS TUF Gaming F15 Core i5 10th Gen description", "price": 55000.0, "uuid": "1e5928f0-0eb5-cd93-d82d-a6cd17804855", "category": "Laptop", "rating": 4.6, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/l3rmzrk0/computer/2/o/q/-original-imagetjfvgfsm24g.jpeg?q=70" }, { "name": "acer Aspire 7 Ryzen 5", "description": "acer Aspire 7 Ryzen 5 description", "price": 47990.0, "uuid": "fa7100f5-a404-bad1-300f-371db1d9af63", "category": "Laptop", "rating": 4.3, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/b/e/h/-original-imagjyc69gh3a8wu.jpeg?q=70" }, { "name": "DELL G15 Core i7 11th Gen", "description": "DELL G15 Core i7 11th Gen description", "price": 99990.0, "uuid": "65b0f3ae-7aca-a59b-2ab9-1ae28c3e535d", "category": "Laptop", "rating": 4.2, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/kqb8pzk0/computer/d/j/c/na-2-in-1-laptop-dell-original-imag4dy68bwtg8j9.jpeg?q=70" }, { "name": "OnePlus U1S 164 cm (65 inch) Ultra HD (4K)", "description": "OnePlus U1S 164 cm description", "price": 75990.0, "uuid": "4639680e-731e-752d-7fad-56c63f681830", "category": "Smart TV", "rating": 3.9, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/kuwzssw0/television/i/q/x/u-series-50-u1s-50uc1a00-oneplus-original-imag7xtnfn7yrfrn.jpeg?q=70" }, { "name": "LG 139 cm (55 inch) OLED Ultra HD (4K)", "description": "LG 139 cm (55 inch) OLED Ultra HD (4K) description", "price": 129000.0, "uuid": "54d6e11e-a3cc-0d13-cc3a-66a8e68c6348", "category": "Smart TV", "rating": 4.6, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/k1s6ljk0/television/s/r/3/lg-oled55c9pta-original-imafkt9pf9gumafg.jpeg?q=70" }, { "name": "SONY Bravia 138.8 cm (55 inch) Ultra HD (4K)", "description": "SONY Bravia 138.8 cm (55 inch) Ultra HD (4K) description", "price": 74999.0, "uuid": "42b478a2-7164-0067-19e0-c17e772fa448", "category": "Smart TV", "rating": 4.8, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/l2rwzgw0/television/j/p/0/kd-55x80aj-sony-original-imagefgmyfkbavde.jpeg?q=70" }, { "name": "SAMSUNG 138 cm (55 inch) Ultra HD (4K)", "description": "SAMSUNG 138 cm (55 inch) Ultra HD (4K) description", "price": 92999.0, "uuid": "074c741f-0c21-fa14-3b9c-8ab56954d2c9", "category": "Smart TV", "rating": 4.5, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/xif0q/television/a/j/v/ua55bu8000klxl-samsung-original-imaggb4zpx37wgee.jpeg?q=70" }, { "name": "LG Nanocell 139 cm (55 inch) Ultra HD (4K)", "description": "LG Nanocell 139 cm (55 inch) Ultra HD (4K) description", "price": 89990.0, "uuid": "679a7f99-c981-cf55-e516-a4bcede71391", "category": "Smart TV", "rating": 4.7, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/jy3anbk0/television/z/7/y/lg-49sm8100pta-original-imafgcrpyhpdjgym.jpeg?q=70" }]
    allProducts: any = [];
    //products: any = [];
    filteredProducts: any[] = []
    categories: any[] = [];
    ratingsArr: any[] = [
        { id: 'rating-4', rating: 4, checked: false },
        { id: 'rating-3', rating: 3, checked: false },
        { id: 'rating-2', rating: 2, checked: false },
        { id: 'rating-1', rating: 1, checked: false },

    ];
    filterPrice: number = 0;
    //wishlist = ['Hemanth Wishlist', 'Virat Wishlist', 'Kane Wishlist', 'Tom Cruise Wishlist'];
    wishlist: any[] = ['Hemanth', 'Sharma'];
    selectedWishlist = [];
    showMenu: any = null;

    constructor(private productsService: ProductsService, private router: Router, private renderer: Renderer2, private dialog: MatDialog) { }

    @ViewChildren('catg') catg!: QueryList<any>;
    @ViewChildren('wishlistMenuTrigger') wishlistMenuTrigger!: QueryList<MatMenuTrigger>;

    ngOnInit() {
        // if (!localStorage.getItem('Auth_Token')) {
        //     this.router.navigate(['/login'])
        // }
        this.productsService.getRealProducts().subscribe(res => {
            this.products = res;
            this.allProducts = res;
            this.categories = [...new Set(this.products.map((product: any) => product.category))];
            console.log(this.products);
            console.log(this.categories)
        });
    }

    updateFilterPrice(event: any) {
        this.filterPrice = event.value;
        this.filters[1].price = event.value;

        const internalFilteredProducts: any[] = [];
        const filteredProducts = this.allProducts.filter((product: any) => product.price <= this.filters[1].price);
        const filteredProducts1 = this.filters[2].category ? filteredProducts.filter((product: any) => product.category === this.filters[2].category) : filteredProducts;

        let ratingsfilteredProducts: any[] = [];
        if (this.filters[0].ratingsArr.length) {
            for (let product of filteredProducts1) {
                this.filters[0].ratingsArr.forEach((rating: any) => {
                    if (product.rating > rating && ratingsfilteredProducts.length > 0) {
                        const index = ratingsfilteredProducts.findIndex((fproduct: any) => fproduct.uuid === product.uuid);
                        if (index > -1) {
                            return;
                        } else {
                            ratingsfilteredProducts.push(product);
                        }
                    }

                    if (product.rating > rating && ratingsfilteredProducts.length === 0) {
                        ratingsfilteredProducts.push(product);
                    }
                })
            }
        } else {
            ratingsfilteredProducts = [...filteredProducts1];
        }

        this.products = [...ratingsfilteredProducts];

    }

    wishlistHandler(event: any) {
        console.log(event)
    }

    onRatingsFilterChange(event: MatCheckboxChange) {
        const checkBoxId = event.source.id;
        const isChecked = event.checked;
        // Find CheckBoxId in ratingsArr and update the checked state
        const ratingChangedIdx = this.ratingsArr.findIndex(ratingObj => ratingObj.id === checkBoxId);
        this.ratingsArr[ratingChangedIdx].checked = isChecked;
        if (isChecked) {
            this.filters[0].ratingsArr.push(this.ratingsArr[ratingChangedIdx].rating);
        }

        if (!isChecked) {
            const index = this.filters[0].ratingsArr.indexOf(this.ratingsArr[ratingChangedIdx].rating);
            if (index > -1) {
                this.filters[0].ratingsArr.splice(index, 1);
            }
        }

        if (!this.filters[0].ratingsArr.length && !this.filters[1].price && !this.filters[1].category) {
            return this.products = [...this.allProducts];
        }
        let ratingsfilteredProducts: any[] = [];
        if (this.filters[0].ratingsArr.length) {
            for (let product of this.allProducts) {
                this.filters[0].ratingsArr.forEach((rating: any) => {
                    if (product.rating > rating && ratingsfilteredProducts.length > 0) {
                        const index = ratingsfilteredProducts.findIndex((fproduct: any) => fproduct.uuid === product.uuid);
                        if (index > -1) {
                            return;
                        } else {
                            ratingsfilteredProducts.push(product);
                        }
                    }

                    if (product.rating > rating && ratingsfilteredProducts.length === 0) {
                        ratingsfilteredProducts.push(product);
                    }
                })
            }
            let filteredProducts1: any[] = [];
            let filteredProducts2: any[] = [];

            filteredProducts1 = this.filters[1].price ? ratingsfilteredProducts.filter((product: any) => product.price <= this.filters[1].price) : ratingsfilteredProducts;
            filteredProducts2 = this.filters[2].category ? filteredProducts1.filter((product: any) => product.category === this.filters[2].category) : filteredProducts1;
            return this.products = [...filteredProducts2];
        } else {
            let filteredProducts1: any[] = [];
            let filteredProducts2: any[] = [];

            filteredProducts1 = this.filters[1].price ? this.allProducts.filter((product: any) => product.price <= this.filters[1].price) : this.allProducts;
            filteredProducts2 = this.filters[2].category ? filteredProducts1.filter((product: any) => product.category === this.filters[2].category) : filteredProducts1;
            return this.products = [...filteredProducts2];
        }
    }

    onCategoryClick(idx: any, catg: MatAnchor) {
        const elRef = catg._elementRef;
        const catEls = Array.from(elRef.nativeElement.parentElement.children);
        console.log(catEls)
        catEls.forEach((catEl: any) => {
            const catElClassArr = [...catEl.classList];
            if (catElClassArr.includes('highlight-catg') && catEl.id !== idx) {
                this.renderer.removeClass(catEl, 'highlight-catg');
            }
        })
        this.filters[2].category = this.categories[idx];
        console.log(this.filters);
        this.renderer.addClass(elRef.nativeElement, 'highlight-catg');

        const internalFilteredProducts: any[] = [];
        const filteredProducts = this.allProducts.filter((product: any) => product.category === this.filters[2].category);
        const filteredProducts1 = this.filters[1].price ? filteredProducts.filter((product: any) => product.price <= this.filters[1].price) : filteredProducts;
        let ratingsfilteredProducts: any[] = [];
        if (this.filters[0].ratingsArr.length) {
            for (let product of filteredProducts1) {
                this.filters[0].ratingsArr.forEach((rating: any) => {
                    if (product.rating > rating && ratingsfilteredProducts.length > 0) {
                        const index = ratingsfilteredProducts.findIndex((fproduct: any) => fproduct.uuid === product.uuid);
                        if (index > -1) {
                            return;
                        } else {
                            ratingsfilteredProducts.push(product);
                        }
                    }

                    if (product.rating > rating && ratingsfilteredProducts.length === 0) {
                        ratingsfilteredProducts.push(product);
                    }
                })
            }
        } else {
            ratingsfilteredProducts = [...filteredProducts1];
        }

        this.products = [...ratingsfilteredProducts];
    }

    onFiltersReset() {
        this.filters[0].ratingsArr = [];
        this.filters[1].price = '';
        this.filters[2].category = '';

        this.filterPrice = 0;
        this.catg.forEach((catEl) => {
            const catNativeEl: any = catEl._elementRef.nativeElement;
            const catElClassArr = [...catNativeEl.classList];
            if (catElClassArr.includes('highlight-catg')) {
                this.renderer.removeClass(catNativeEl, 'highlight-catg');
            }
        })

        this.ratingsArr.forEach((ratingObj: any) => {
            ratingObj.checked = false;
        })

        this.products = [...this.allProducts]

    }

    onPageChange(event: PageEvent) {
        console.log(event);
    }

    onWishlistClick(product: any, index: any) {
        console.log(index);
        console.log(this.wishlistMenuTrigger);
        if (!this.wishlist.length) {
            Array.from(this.wishlistMenuTrigger)[index].closeMenu();
            const dialogRef = this.dialog.open(AppDialog);
            dialogRef.afterClosed().subscribe((res: any) => {
                console.log(product.name)
                console.log(res?.data.wishlistName);
                res?.data.wishlistName ? this.wishlist.push(res?.data.wishlistName) : null;
            })
        }
    }
}