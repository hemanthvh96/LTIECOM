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
    allProducts: any = [];
    products: any = [];
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
    wishlists: any[] = [];
    selectedWishlist = [];
    showMenu: any = null;
    user!: User;

    pageIndex: any = 0;
    pageSize: any = 5;
    length: any = this.products.length;
    currentSort: string = '';
    showSnackbar = true;

    constructor(private productsService: ProductsService, private wishlistService: WishlistService, private router: Router, private renderer: Renderer2, private dialog: MatDialog, private cd: ChangeDetectorRef, private cartService: CartService, private _snackBar: MatSnackBar) { }

    @ViewChildren('catg') catg!: QueryList<any>;
    @ViewChildren(MatMenuTrigger) wishlistMenuTrigger!: QueryList<MatMenuTrigger>;
    @ViewChildren('wishlistMenuTrigger') wishlistMenuTrigger1!: QueryList<ElementRef<any>>;

    ngOnInit() {
        if (!localStorage.getItem('Auth_Token')) {
            this.router.navigate(['/'])
        } else {
            this.user = JSON.parse(localStorage.getItem('user') as string);
        }
        this.productsService.getRealProducts().subscribe(res => {
            this.products = res;
            this.allProducts = res;
            this.categories = [...new Set(this.products.map((product: any) => product.category))];
            this.paginationProducts = this.products.slice(0, 5);
        });

        this.wishlistService.getAllWishlists(this.user.customerUuid).subscribe((res: any) => {
            this.wishlists = [...res];
        })

        this.cartService.getAllCartProducts(this.user.customerUuid).subscribe((res: any) => {
            this.cartProducts = [...res];
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
    }

    /* Pagination Products Implemented */
    onRatingsFilterChange(event: MatCheckboxChange) {
        const checkBoxId = event.source.id;
        const isChecked = event.checked;
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
            if (this.currentSort === 'high') {
                this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
            }
            if (this.currentSort === 'low') {
                this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)]
            }
            this.pageIndex = 0
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
            if (this.currentSort === 'high') {
                this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
            }
            if (this.currentSort === 'low') {
                this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)]
            }
            this.pageIndex = 0;
            return this.paginateProducts();
        } else {
            let filteredProducts1: any[] = [];
            let filteredProducts2: any[] = [];

            filteredProducts1 = this.filters[1].price ? this.allProducts.filter((product: any) => product.price <= this.filters[1].price) : this.allProducts;
            filteredProducts2 = this.filters[2].category ? filteredProducts1.filter((product: any) => product.category === this.filters[2].category) : filteredProducts1;
            this.products = [...filteredProducts2];
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
                            Array.from(this.wishlistMenuTrigger1).forEach((el: any) => {
                                const matIconNativeEl = el._elementRef.nativeElement;
                                if (matIconNativeEl.id == index) {
                                    this.renderer.setAttribute(matIconNativeEl, 'fontIcon', 'favorite');
                                    this.renderer.setStyle(matIconNativeEl, 'color', '#ff4343')
                                }
                            })
                            this.wishlistService.getAllWishlists(this.user.customerUuid).subscribe((res: any) => {
                                this.wishlists = [...res];
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
        return checkedStatus
    }

    onWishlistAddDelete(event: MatCheckboxChange, wishlist: any, product: any, index: any) {
        if (event.checked) {
            Array.from(this.wishlistMenuTrigger1).forEach((el: any) => {
                const matIconNativeEl = el._elementRef.nativeElement;
                if (matIconNativeEl.id == index) {
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
            this.wishlistService.getAllWishlists(this.user.customerUuid).subscribe((res: any) => {
                this.wishlists = [...res];
            })

        })
    }

    deleteProductFromWishlist(product: any, wishlist: any, index: any) {
        const productToRemove = wishlist.wishlistProduct.filter((prod: any) => prod.productname === product.name);
        this.wishlistService.removeProductFromWishlist(productToRemove[0].uuid).subscribe(res => {
            this.wishlistService.getAllWishlists(this.user.customerUuid).subscribe((res: any) => {
                this.wishlists = [...res];
                let isProductAvailableInWishlist = false;
                this.wishlists.forEach((wishlistEl: any) => {
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
                            this.renderer.setAttribute(matIconNativeEl, 'fontIcon', 'favorite_border');
                            this.renderer.setStyle(matIconNativeEl, 'color', '#000000')
                        }
                    })
                }
            })
        })

    }

    onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        this.length = event.length
        this.paginateProducts();
    }

    paginateProducts() {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;

        const paginationProducts = this.products.slice(start, end);
        this.paginationProducts = [...paginationProducts];
    }

    onPriceSortChange(event?: MatSelectChange) {
        let sortValue = event ? event.value : this.currentSort;
        if (event) {
            this.currentSort = event.value;
        }
        if (sortValue === 'high') {
            this.products = [...this.products.sort((product1: any, product2: any) => product2.price - product1.price)]
            this.pageIndex = 0;
            this.paginateProducts()
        }

        if (sortValue === 'low') {
            this.products = [...this.products.sort((product1: any, product2: any) => product1.price - product2.price)];
            this.pageIndex = 0;
            this.paginateProducts()
        }
    }

    onAddToCartProduct(product: any, event: any) {
        const productDetails = {
            productname: product.name,
            description: product.description,
            quantity: 1,
            price: product.price,
            totalprice: product.price,
            category: product.category,
            customer_uuid: this.user.customerUuid
        }

        if (event._elementRef.nativeElement.innerText === 'GO TO CART') {
            this.router.navigate(['/cart'])
        } else if (event._elementRef.nativeElement.innerText === 'ADD TO CART') {
            this.cartService.addProductToCart(productDetails).subscribe(res => {
                this.cartService.getAllCartProducts(this.user.customerUuid).subscribe((res: any) => {
                    this.cartProducts = [...res];
                    this.renderer.setProperty(event._elementRef.nativeElement, 'innerText', 'GO TO CART');
                    this._snackBar.open("Product Added To Cart !", "Done", {
                        duration: 4000,
                        verticalPosition: "top", 
                        horizontalPosition: "center" 
                    });
                })
            })
        }

        if (event._elementRef.nativeElement.innerText === 'BUY NOW') {
            const isProductInCartIndex = this.cartProducts.findIndex((prod: any) => prod.productname === product.name);
            if (isProductInCartIndex > -1) {
                this.router.navigate(['/cart'])
            } else {
                this.cartService.addProductToCart(productDetails).subscribe(res => {
                    this.router.navigate(['/cart'])
                })
            }
        }
    }

    getProductCartStatus(product: any) {
        let isProductInCart = false;
        this.cartProducts.forEach((prod: any) => {
            if (prod.productname === product.name) {
                isProductInCart = true;
            }
        })
        return isProductInCart ? 'GO TO CART' : 'ADD TO CART'
    }

    formatLabel(value: number) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return value;
    }
}