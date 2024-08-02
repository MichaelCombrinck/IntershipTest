import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../core/models/product';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  public products: Product[] = [];
  public initProducts: Product[] = [
    {
      id: 1,
      name: 'Top-Down-Sneakers',
      description: 'Comfortable Sneakers that will make your friends jealous',
      type: 'clothes',
      category: 'sneakers',
      quantity: 1,
      price: 40.0,
      rating: 4,
      imageUrl: '../../../assets/images/sneaker-one.jpg',
      wishlist: false,
    },
    {
      id: 2,
      name: 'Night Sneakers',
      description:
        'Feel tired and want to walk around your house ? Night Sneakers is for you.',
      type: 'clothes',
      category: 'sneakers',
      quantity: 1,
      price: 2000.0,
      rating: 5,
      imageUrl: '../../../assets/images/shrocs.jpg',
      wishlist: false,
    },
    {
      id: 3,
      name: 'T-Shirt Crocodile',
      description:
        'T-Shirt made of crocodile skin, which will make you feel cold blooded and crocky.',
      type: 'clothes',
      category: 't-shirt',
      quantity: 1,
      price: 20000.0,
      rating: 3,
      imageUrl: '../../../assets/images/crocodile-leather.jpg',
      wishlist: false,
    },
    {
      id: 4,
      name: 'Denim Jeans',
      description: 'Feel cold get Jeans',
      type: 'clothes',
      category: 'jeans',
      quantity: 1,
      price: 5.0,
      rating: 1,
      imageUrl: '../../../assets/images/denim-jeans.jpg',
      wishlist: false,
    },
    {
      id: 5,
      name: 'Grass Hopper',
      description: 'Crunchy yet with a bit of a grassy taste',
      type: 'food',
      category: 'chinese',
      quantity: 1,
      price: 1000.0,
      rating: 5,
      imageUrl: '../../../assets/images/grasshopper.jpg',
      wishlist: false,
    },
    {
      id: 6,
      name: 'Biltong',
      description: 'The king of snacks',
      type: 'food',
      category: 'south-african',
      quantity: 1,
      price: 2000.0,
      rating: 5,
      imageUrl: '../../../assets/images/billtong.jpg',
      wishlist: false,
    },
    {
      id: 7,
      name: 'Spaghetti',
      description:
        'Top quality pasta with saucy tomato mince, that melts in your mouth',
      type: 'food',
      category: 'italian',
      quantity: 1,
      price: 100.0,
      rating: 4,
      imageUrl: '../../../assets/images/spaghetti.jpg',
      wishlist: false,
    },
  ];

  public productList: Product[] = [];

  public desktop: boolean = true;

  public productIsWishlist: Product[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private _productService: ProductService,
  ) {
    
  }

  ngOnInit(): void {
    this._productService.ProductList.subscribe((value) => {
      this.products = value;
    });

    if (this.products.length === 0) {
      this._productService.setAllProducts(this.initProducts);
    }
  }

  onWishlistToggleClick(index: number) {
    const product = this.products[index];
    product.wishlist = !product.wishlist;
    if (product.wishlist) {
      this._productService.addProductToWishlist(product);
      this._snackBar.open('Product added to Wishlist', 'Close', {
        duration: 5000,
      });
    } else {
      this._productService.removeWishlistProduct(product);
      this._snackBar.open('Product removed from Wishlist', 'Close', {
        duration: 5000,
      });
    }
  }

  onAddToCardClick(product: Product) {
    this._productService.addCheckoutProducts(product);
    this._snackBar.open('Product added to Cart', 'Close', {
      duration: 5000,
    });
  }

  // look at this
  setRating(product: Product, rating: number) {
    product.rating = rating;
  }

  getStarArray(rating: number): boolean[] {
    const stars = Array(5).fill(false);
    for (let i = 0; i < rating; i++) {
      stars[i] = true;
    }
    return stars;
  }
}
