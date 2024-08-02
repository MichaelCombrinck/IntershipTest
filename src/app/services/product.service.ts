import { Inject, Injectable } from '@angular/core';
import { Product } from '../core/models/product';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public ProductList = new BehaviorSubject<Product[]>([]);
  public allProducts: Product[] = [];

  public products: Product[] = [];
  public walletList = new BehaviorSubject<Product[]>([]);
  public checkoutList: Product[] = [];
  public wishlistProducts: Product[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  // System Products

  public getAllProducts() {
    return this.allProducts;
  }

  public setAllProducts(allProducts: Product[]) {
    this.allProducts.push(...allProducts);
    this.applyWishlistStatus();
    this.ProductList.next(this.allProducts);
  }

  // Wishlist Section

  public getProductWishlistProducts() {
    this.loadWishlistFromLocalStorage();
    return this.wishlistProducts;
  }

  public setWishlistProduct(products: Product[]) {
    this.wishlistProducts.push(...products);
    this.saveWishlistToLocalStorage();
  }

  private saveWishlistToLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistProducts));
  }

  private loadWishlistFromLocalStorage() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlistProducts = JSON.parse(storedWishlist);
    }
  }

  public addProductToWishlist(product: Product) {
    if (
      !this.wishlistProducts.some(
        (p) => p.name === product.name && p.type === product.type
      )
    ) {
      this.wishlistProducts.push(product);
      localStorage?.setItem('wishlist', JSON.stringify(this.wishlistProducts));
    }
  }

  private applyWishlistStatus() {
    this.allProducts = this.allProducts.map((product) => {
      product.wishlist = this.wishlistProducts.some(
        (wishlistProduct) => wishlistProduct.id === product.id
      );
      return product;
    });
    this.ProductList.next(this.allProducts);
  }

  public removeWishlistProduct(removedWishlist: Product) {
    this.wishlistProducts = this.wishlistProducts.filter(
      (x) => x.id !== removedWishlist.id
    );
    this.allProducts = this.allProducts.map((p) => {
      const found = this.wishlistProducts.find((wp) => wp.id === p.id);
      p.wishlist = found != null;
      return p;
    });
    this.ProductList.next(this.allProducts);
    localStorage?.setItem('wishlist', JSON.stringify(this.wishlistProducts));
  }

  // Checkout Section

  public getCheckoutProducts() {
    return this.walletList.value;
  }

  public addCheckoutProducts(product: Product) {
    const checkoutList = this.walletList.value;
    const existingProduct = checkoutList.find(
      (p) => p.name === product.name && p.type === product.type
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      checkoutList.push({ ...product, quantity: 1 });
    }
    this.walletList.next([...checkoutList]);
  }

  public removeCheckoutProduct(removedCheckoutProduct: Product) {
    const checkoutList = this.walletList.value;
    const index = checkoutList.indexOf(removedCheckoutProduct);
    if (index !== -1) {
      checkoutList.splice(index, 1);
      this.walletList.next([...checkoutList]);
    }
  }

  public setProductCheckoutQuantity(products: Product) {
    const checkoutList = this.walletList.value;
    const index = checkoutList.indexOf(products, 0);
    if (index === -1) {
      return;
    }
    checkoutList[index].quantity += 1;
    this.walletList.next([...checkoutList]);
  }

  // Filtering Section

  public filteringProductSection(categories: string[], searchQuery: string) {
    let filteredProducts = this.allProducts;

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.includes(product.category)
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    this.ProductList.next(filteredProducts);
  }
}
