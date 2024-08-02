import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Filters } from '../../core/models/product';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ProductCardComponent,
    MatMenuModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
})
export class ProductListPageComponent {
  filteringList: string[] = [];

  searchQuery: string = '';

  isMenuOpen: boolean = false;

  showFiller = false;

  showDrawer:boolean = false;

  links:string[] = ['Sorting Products']

  checkoutProductAmount: number = 0;

  browserRefresh: boolean = false;

  filters: Filters[] = [
    {
      filterName: 'Foods',
      items: [
        {
          displayValue: 'Italian',
          value: 'italian',
        },
        {
          displayValue: 'Chinese',
          value: 'chinese',
        },
        {
          displayValue: 'South-African',
          value: 'south-african',
        },
      ],
    },
    {
      filterName: 'Clothes',
      items: [
        {
          displayValue: 'Sneakers',
          value: 'sneakers',
        },
        {
          displayValue: 'T-Shirt',
          value: 't-shirt',
        },
        {
          displayValue: 'Jeans',
          value: 'jeans',
        },
        {
          displayValue: 'Golf Shirts',
          value: 'golfShirts',
        },
        {
          displayValue: 'Jackets',
          value: 'jackets',
        },
      ],
    },
  ];
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  constructor(private _route: Router, private _productService: ProductService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this._productService.getAllProducts();
  }

  onWishlistLinkClick() {
    this._route.navigate(['wishlist']);
  }

  onCheckoutCardClick() {
    this._route.navigate(['checkout']);
  }

  onCheckCategory(event: any, category: string) {
    if (event.checked) {
      this.filteringList.push(category);
    } else {
      const index = this.filteringList.indexOf(category);
      if (index > -1) {
        this.filteringList.splice(index, 1);
      }
    }
    this.applyFilters();
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      this.searchQuery = inputElement.value;
      this.applyFilters();
    }
  }

  applyFilters() {
    this._productService.filteringProductSection(
      this.filteringList,
      this.searchQuery
    );
  }

  onSortClick(criteria: string, order: string) {
    const products = this._productService.getAllProducts();
    products.sort((a, b) => {
      let comparison = 0;

      if (criteria === 'price' || criteria === 'rating') {
        comparison = a[criteria] - b[criteria];
      } else if (criteria === 'name') {
        comparison = a[criteria].localeCompare(b[criteria]);
      }

      return order === 'asc' ? comparison : -comparison;
    });
    this._productService.ProductList.next(products);
  }


}
