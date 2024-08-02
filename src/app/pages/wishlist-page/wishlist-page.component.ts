import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../../core/models/product';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
  ],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent {
  constructor(
    private _route: Router,
    private _productService: ProductService, 
    public snackbar: MatSnackBar
  ) {}

  public displayedColumns: string[] = [
    'imageUrl',
    'name',
    'type',
    'category',
    'price',
    'remove',
    'addToCheckout'
  ];
  public dataSource = this._productService.getProductWishlistProducts();

  public total: number = 2000;

  onHouseLinkClick() {
    this._route.navigate(['product-list-page']);
  }

  removeFromWishlist(product: Product) {
    this._productService.removeWishlistProduct(product);
    this.dataSource = this.dataSource.filter(p => p !== product);
  }

  addToCheckout(product: Product) {
    this._productService.addCheckoutProducts(product);
    this.snackbar.open('Product was added in Wallet', 'Close' , {
      duration: 30000,
    })
  }
}
