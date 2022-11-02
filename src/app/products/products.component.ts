import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Product, ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDialog } from '../dialog/dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { WishlistService } from '../services/wishlist.service';
import { User } from '../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatSelectChange } from '@angular/material/select';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})

export class ProductsComponent implements OnInit {

    filters: any = [{ 'ratingsArr': [] }, { 'price': '' }, { 'category': '' }];
    //products: any = [{ "name": "Apple iPhone 12", "description": "iPhone 12 description", "price": 54990.0, "uuid": "f4b1fd39-d505-d784-c18e-5ebc63d016aa", "category": "Mobile", "rating": 4.5, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/kg8avm80/mobile/q/8/f/apple-iphone-12-dummyapplefsn-original-imafwg8dbzv8vh7t.jpeg?q=70" }, { "name": "OnePlus Nord CE2 Lite 5G", "description": "OnePlus Nord CE2 Lite 5G description", "price": 35000.0, "uuid": "72274e90-c6ba-f341-8d7d-ad1fd45eb6f1", "category": "Mobile", "rating": 4.3, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/xif0q/mobile/9/x/u/-original-imagg2abzhxjckxu.jpeg?q=70" }, { "name": "POCO C31", "description": "POCO C31 description", "price": 18000.0, "uuid": "208fe491-a849-4299-cfcb-9a5b0bc8371b", "category": "Mobile", "rating": 3.7, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/ku4ezrk0/mobile/p/e/4/c31-mzb0a0jin-poco-original-imag7bzqxgdhgf2n.jpeg?q=70" }, { "name": "Realme C35", "description": "Realme C35 description", "price": 19000.0, "uuid": "3b490758-e7b7-30fc-dcd6-5977232573a4", "category": "Mobile", "rating": 4.1, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/l0fm07k0/mobile/y/g/i/-original-imagc7ryyhrrcgxh.jpeg?q=70" }, { "name": "vivo f19 Pro Plus", "description": "vivo f19 Pro Plus description", "price": 24000.0, "uuid": "af7b3fe5-04a8-e800-2db5-8613c85d40bb", "category": "Mobile", "rating": 3.9, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/kn97te80/mobile/p/m/9/f19-pro-5g-cph2213-oppo-original-imagfz38hbzjhkqx.jpeg?q=70" }, { "name": "Apple 2020 Macbook Air M1", "description": "Apple 2020 Macbook Air M1 description", "price": 94990.0, "uuid": "d48d6caf-717d-8d91-4c82-dfeeeb772c71", "category": "Laptop", "rating": 4.8, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/khdqnbk0/computer/s/2/g/apple-original-imafxfyqykyghjg6.jpeg?q=70" }, { "name": "HP Core i5 12th Gen", "description": "HP Core i5 12th Gen description", "price": 64990.0, "uuid": "5d6630f9-6309-2b7c-6fe2-f4f704c06a97", "category": "Laptop", "rating": 4.5, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/d/r/e/15s-fq5111tu-thin-and-light-laptop-hp-original-imagha3x4gbfwsdx.jpeg?q=70" }, { "name": "ASUS TUF Gaming F15 Core i5 10th Gen", "description": "ASUS TUF Gaming F15 Core i5 10th Gen description", "price": 55000.0, "uuid": "1e5928f0-0eb5-cd93-d82d-a6cd17804855", "category": "Laptop", "rating": 4.6, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/l3rmzrk0/computer/2/o/q/-original-imagetjfvgfsm24g.jpeg?q=70" }, { "name": "acer Aspire 7 Ryzen 5", "description": "acer Aspire 7 Ryzen 5 description", "price": 47990.0, "uuid": "fa7100f5-a404-bad1-300f-371db1d9af63", "category": "Laptop", "rating": 4.3, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/b/e/h/-original-imagjyc69gh3a8wu.jpeg?q=70" }, { "name": "DELL G15 Core i7 11th Gen", "description": "DELL G15 Core i7 11th Gen description", "price": 99990.0, "uuid": "65b0f3ae-7aca-a59b-2ab9-1ae28c3e535d", "category": "Laptop", "rating": 4.2, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/kqb8pzk0/computer/d/j/c/na-2-in-1-laptop-dell-original-imag4dy68bwtg8j9.jpeg?q=70" }, { "name": "OnePlus U1S 164 cm (65 inch) Ultra HD (4K)", "description": "OnePlus U1S 164 cm description", "price": 75990.0, "uuid": "4639680e-731e-752d-7fad-56c63f681830", "category": "Smart TV", "rating": 3.9, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/kuwzssw0/television/i/q/x/u-series-50-u1s-50uc1a00-oneplus-original-imag7xtnfn7yrfrn.jpeg?q=70" }, { "name": "LG 139 cm (55 inch) OLED Ultra HD (4K)", "description": "LG 139 cm (55 inch) OLED Ultra HD (4K) description", "price": 129000.0, "uuid": "54d6e11e-a3cc-0d13-cc3a-66a8e68c6348", "category": "Smart TV", "rating": 4.6, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/k1s6ljk0/television/s/r/3/lg-oled55c9pta-original-imafkt9pf9gumafg.jpeg?q=70" }, { "name": "SONY Bravia 138.8 cm (55 inch) Ultra HD (4K)", "description": "SONY Bravia 138.8 cm (55 inch) Ultra HD (4K) description", "price": 74999.0, "uuid": "42b478a2-7164-0067-19e0-c17e772fa448", "category": "Smart TV", "rating": 4.8, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/l2rwzgw0/television/j/p/0/kd-55x80aj-sony-original-imagefgmyfkbavde.jpeg?q=70" }, { "name": "SAMSUNG 138 cm (55 inch) Ultra HD (4K)", "description": "SAMSUNG 138 cm (55 inch) Ultra HD (4K) description", "price": 92999.0, "uuid": "074c741f-0c21-fa14-3b9c-8ab56954d2c9", "category": "Smart TV", "rating": 4.5, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/xif0q/television/a/j/v/ua55bu8000klxl-samsung-original-imaggb4zpx37wgee.jpeg?q=70" }, { "name": "LG Nanocell 139 cm (55 inch) Ultra HD (4K)", "description": "LG Nanocell 139 cm (55 inch) Ultra HD (4K) description", "price": 89990.0, "uuid": "679a7f99-c981-cf55-e516-a4bcede71391", "category": "Smart TV", "rating": 4.7, "imagesrc": "https://rukminim1.flixcart.com/image/416/416/jy3anbk0/television/z/7/y/lg-49sm8100pta-original-imafgcrpyhpdjgym.jpeg?q=70" }]
    allProducts: any = [];
    products: any = [];
    //filteredProducts: any[] = []
    paginationProducts: any[] = [];
    cartProducts: any[] = [];
    categories: any[] = [];
    ratingsArr: any[] = [
        { id: 'rating-4', rating: 4, checked: false },
        { id: 'rating-3', rating: 3, checked: false },
        { id: 'rating-2', rating: 2, checked: false },
        { id: 'rating-1', rating: 1, checked: false },

    ];
    filterPrice: number = 0;
    //wishlist = ['Hemanth Wishlist', 'Virat Wishlist', 'Kane Wishlist', 'Tom Cruise Wishlist'];
    wishlists: any[] = [];
    selectedWishlist = [];
    showMenu: any = null;
    user!: User;

    pageIndex: any = 0;
    pageSize: any = 5;
    length: any = this.products.length;
    currentSort: string = 'low';
    showSnackbar = true;

    constructor(private productsService: ProductsService, private wishlistService: WishlistService, private router: Router, private renderer: Renderer2, private dialog: MatDialog, private cd: ChangeDetectorRef, private cartService: CartService, private _snackBar: MatSnackBar) { }

    @ViewChildren('catg') catg!: QueryList<any>;
    @ViewChildren(MatMenuTrigger) wishlistMenuTrigger!: QueryList<MatMenuTrigger>;
    @ViewChildren('wishlistMenuTrigger') wishlistMenuTrigger1!: QueryList<ElementRef<any>>;

    ngOnInit() {
        if (!localStorage.getItem('Auth_Token')) {
            this.router.navigate(['/login'])
        } else {
            this.user = JSON.parse(localStorage.getItem('user') as string);
        }
        this.productsService.getRealProducts().subscribe(res => {
            this.products = res;
            this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)];
            this.allProducts = res;
            this.categories = [...new Set(this.products.map((product: any) => product.category))];
            this.paginationProducts = this.products.slice(0, 5);
            //this.onPriceSortChange();
        });

        this.wishlistService.getAllWishlists(this.user.customerUuid).subscribe((res: any) => {
            this.wishlists = [...res];
            console.log("Getting all wishlists");
            console.log(this.wishlists)
        })

        this.cartService.getAllCartProducts(this.user.customerUuid).subscribe((res: any) => {
            console.log('Fetching cart items');
            this.cartProducts = [...res];
            console.log(this.cartProducts)
        })


    }
    /* Pagination Products Implemented */
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
        if (this.currentSort === 'high') {
            this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
        }
        if (this.currentSort === 'low') {
            this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)]
        }
        this.pageIndex = 0;
        this.paginateProducts();
    }

    wishlistHandler(event: any) {
        console.log(event)
    }

    /* Pagination Products Implemented */
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

        if (!this.filters[0].ratingsArr.length && !this.filters[1].price && !this.filters[2].category) {
            this.products = [...this.allProducts];
            this.paginationProducts = [...this.products]
            return this.paginateProducts();
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
            this.products = [...filteredProducts2];
            //this.products = [...ratingsfilteredProducts];
            if (this.currentSort === 'high') {
                this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
            }
            if (this.currentSort === 'low') {
                this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)]
            }
            this.pageIndex = 0;
            return this.paginateProducts();
            //this.paginationProducts = [...this.products]
        } else {
            let filteredProducts1: any[] = [];
            let filteredProducts2: any[] = [];

            filteredProducts1 = this.filters[1].price ? this.allProducts.filter((product: any) => product.price <= this.filters[1].price) : this.allProducts;
            filteredProducts2 = this.filters[2].category ? filteredProducts1.filter((product: any) => product.category === this.filters[2].category) : filteredProducts1;
            this.products = [...filteredProducts2];
            //this.paginationProducts = [...this.products];
            if (this.currentSort === 'high') {
                this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
            }
            if (this.currentSort === 'low') {
                this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)]
            }
            this.pageIndex = 0;
            return this.paginateProducts();
        }
    }

    /* Pagination Products Implemented */
    onCategoryClick(idx: any, catg: MatAnchor) {
        const elRef = catg._elementRef;
        const catEls = Array.from(elRef.nativeElement.parentElement.children);
        catEls.forEach((catEl: any) => {
            const catElClassArr = [...catEl.classList];
            if (catElClassArr.includes('highlight-catg') && catEl.id !== idx) {
                this.renderer.removeClass(catEl, 'highlight-catg');
            }
        })
        this.filters[2].category = this.categories[idx];
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
        //this.paginationProducts = [...this.products]
        if (this.currentSort === 'high') {
            this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
        }
        if (this.currentSort === 'low') {
            this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)]
        }
        this.pageIndex = 0;
        return this.paginateProducts();
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

        this.products = [...this.allProducts];
        //this.paginationProducts = this.products.slice(0, 5);
        if (this.currentSort === 'high') {
            this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
        }
        if (this.currentSort === 'low') {
            this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)]
        }
        this.pageIndex = 0
        return this.paginateProducts();

    }

    onWishlistClick(product: any, index: any) {
        console.log(index);
        // console.log(this.wishlistMenuTrigger);
        // console.log(this.wishlistMenuTrigger1);
        // Array.from(this.wishlistMenuTrigger1).forEach((el: any) => {
        //     const matIconNativeEl = el._elementRef.nativeElement;
        //     if (matIconNativeEl.id == index) {
        //         this.renderer.setAttribute(matIconNativeEl, 'fontIcon', 'favorite');
        //         this.renderer.setStyle(matIconNativeEl, 'color', '#ff4343')
        //     }
        // })
        if (!this.wishlists.length) {
            Array.from(this.wishlistMenuTrigger)[index].closeMenu();
            const dialogRef = this.dialog.open(AppDialog);
            dialogRef.afterClosed().subscribe((res: any) => {
                if (res?.data.wishlistName) {
                    const reqBody = {
                        name: res?.data.wishlistName,
                        customer_uuid: this.user.customerUuid
                    }
                    this.wishlistService.createNewWishlist(reqBody).subscribe((res: any) => {
                        console.log('Wishlist created successfully')
                        this.wishlists.push(res);

                        const wishlistProductDetails = {
                            name: res.name,
                            uuid: res.uuid,
                            wishlistProduct: [{
                                productname: product.name,
                                description: product.description,
                                price: product.price,
                                category: product.category,
                                imagesrc: product.imagesrc
                            }]
                        }
                        this.wishlistService.createWishlistProduct(wishlistProductDetails).subscribe(res => {
                            console.log(res);
                            Array.from(this.wishlistMenuTrigger1).forEach((el: any) => {
                                const matIconNativeEl = el._elementRef.nativeElement;
                                if (matIconNativeEl.id == index) {
                                    console.log(matIconNativeEl)
                                    this.renderer.setAttribute(matIconNativeEl, 'fontIcon', 'favorite');
                                    this.renderer.setStyle(matIconNativeEl, 'color', '#ff4343')
                                }
                            })
                            this.wishlistService.getAllWishlists(this.user.customerUuid).subscribe((res: any) => {
                                this.wishlists = [...res];
                                console.log(this.wishlists)
                            })
                        })
                    })
                }
            })
        }
    }

    getCheckedStatus(product: any, wishlist: any, index: any) {
        let checkedStatus = false;
        wishlist.wishlistProduct.forEach((prod: any) => {
            if (prod.productname === product.name) {
                checkedStatus = true;
                Array.from(this.wishlistMenuTrigger1).forEach((el: any) => {
                    const matIconNativeEl = el._elementRef.nativeElement;
                    if (matIconNativeEl.id == index) {
                        this.renderer.setAttribute(matIconNativeEl, 'fontIcon', 'favorite');
                        this.renderer.setStyle(matIconNativeEl, 'color', '#ff4343')
                    }
                })
            }
        })
        //console.log(product, checkedStatus)
        return checkedStatus
    }

    onWishlistAddDelete(event: MatCheckboxChange, wishlist: any, product: any, index: any) {
        console.log('Checking whose wishlist is changed')
        console.log(wishlist);
        if (event.checked) {
            Array.from(this.wishlistMenuTrigger1).forEach((el: any) => {
                const matIconNativeEl = el._elementRef.nativeElement;
                if (matIconNativeEl.id == index) {
                    console.log(matIconNativeEl)
                    this.renderer.setAttribute(matIconNativeEl, 'fontIcon', 'favorite');
                    this.renderer.setStyle(matIconNativeEl, 'color', '#ff4343')
                }
            })
            return this.addProductToWishlist(wishlist, product);
        }

        return this.deleteProductFromWishlist(product, wishlist, index);
    }

    addProductToWishlist(wishlist: any, product: any) {
        const wishlistProductDetails = {
            name: wishlist.name,
            uuid: wishlist.uuid,
            wishlistProduct: [{
                productname: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                imagesrc: product.imagesrc
            }]
        }

        this.wishlistService.createWishlistProduct(wishlistProductDetails).subscribe(res => {
            console.log('wishlist product added successfully')
            //console.log(res);
            console.log('Displaying all wishlists after adding product to wishlist');
            this.wishlistService.getAllWishlists(this.user.customerUuid).subscribe((res: any) => {
                this.wishlists = [...res];
                console.log(this.wishlists)
            })

        })
    }

    deleteProductFromWishlist(product: any, wishlist: any, index: any) {
        // console.log(product)
        // console.log(wishlist)
        const productToRemove = wishlist.wishlistProduct.filter((prod: any) => prod.productname === product.name);
        this.wishlistService.removeProductFromWishlist(productToRemove[0].uuid).subscribe(res => {
            console.log('Product removed from wishlist successfully');
            //console.log(res);
            // const productToRemoveIdx = this.wishlists.findIndex((wishlist: any) => wishlist.wishlistProduct.productname === product.name);
            // console.log(this.wishlists)
            // console.log("Product to reomove idx" + productToRemoveIdx)
            console.log("Displaying all wishlists after deleteing a product ");
            this.wishlistService.getAllWishlists(this.user.customerUuid).subscribe((res: any) => {
                this.wishlists = [...res];
                console.log(this.wishlists)
                console.log("Checking for wishlist fontIcon property")
                let isProductAvailableInWishlist = false;
                this.wishlists.forEach((wishlistEl: any) => {
                    console.log('Checking for unknown wishlist');
                    console.log(wishlistEl);
                    wishlistEl.wishlistProduct.forEach((prod: any) => {
                        if (prod.productname === product.name && isProductAvailableInWishlist === false) {
                            isProductAvailableInWishlist = true;
                        }
                    })

                })

                if (!isProductAvailableInWishlist) {
                    // Remove the red color
                    Array.from(this.wishlistMenuTrigger1).forEach((el: any) => {
                        const matIconNativeEl = el._elementRef.nativeElement;
                        if (matIconNativeEl.id == index) {
                            console.log(matIconNativeEl)
                            this.renderer.setAttribute(matIconNativeEl, 'fontIcon', 'favorite_border');
                            this.renderer.setStyle(matIconNativeEl, 'color', '#000000')
                        }
                    })
                }
            })
        })

    }

    onPageChange(event: PageEvent) {
        console.log(event);
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.length = event.length
        this.paginateProducts();
    }

    paginateProducts() {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;

        const paginationProducts = this.products.slice(start, end);
        console.log(this.products)
        console.log(paginationProducts)
        this.paginationProducts = [...paginationProducts];
        //this.onPriceSortChange();
    }

    onPriceSortChange(event?: MatSelectChange) {
        let sortValue = event ? event.value : this.currentSort;
        if (event) {
            this.currentSort = event.value;
        }
        if (sortValue === 'high') {
            this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
            this.paginateProducts()
        }

        if (sortValue === 'low') {
            this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)];
            this.paginateProducts()
        }
    }

    onAddToCartProduct(product: any, event: any) {
        console.log(event._elementRef);
        const productDetails = {
            productname: product.name,
            description: product.description,
            quantity: 1,
            price: product.price,
            totalprice: product.price,
            category: product.category,
            customer_uuid: this.user.customerUuid
        }

        this.cartService.addProductToCart(productDetails).subscribe(res => {
            console.log("Product added to cart susccessfully");
            this.cartService.getAllCartProducts(this.user.customerUuid).subscribe((res: any) => {
                this.cartProducts = [...res];
                console.log("Displaying the cart products");
                console.log(this.cartProducts);
                console.log(event._elementRef.nativeElement.innerText);

                if (event._elementRef.nativeElement.innerText === 'GO TO CART') {
                    this.router.navigate(['/cart'])
                } else if (event._elementRef.nativeElement.innerText === 'ADD TO CART') {
                    this.renderer.setProperty(event._elementRef.nativeElement, 'innerText', 'GO TO CART');
                    this._snackBar.open("Product Added To Cart !", "Done", {
                        duration: 2000,
                        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
                        horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
                    });
                }

                if (event._elementRef.nativeElement.innerText === 'BUY NOW') {
                    this.router.navigate(['/cart'])
                }
            })
        })
    }

    getProductCartStatus(product: any) {
        console.log("checking cart status");
        //console.log(product)
        let isProductInCart = false;
        this.cartProducts.forEach((prod: any) => {
            if (prod.productname === product.name) {
                isProductInCart = true;
            }
        })
        return isProductInCart ? 'GO TO CART' : 'ADD TO CART'
    }
}