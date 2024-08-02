import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../core/models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-calculation-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './change-calculation-page.component.html',
  styleUrl: './change-calculation-page.component.scss',
})
export class ChangeCalculationPageComponent implements OnInit {
  public totalOfCard: number = 0;

  public amountPaid: number = 0;

  public totalCostPerProduct: number = 0;

  public changeMessage: string | null = null;

  public displayedColumns: string[] = [
    'imageUrl',
    'name',
    'type',
    'category',
    'quantity',
    'price',
    'totalCost',
    'remove',
  ];
  public dataSource = this._productService.getCheckoutProducts();

  ngOnInit(): void {
    this.calculateTotal();
  }

  constructor(
    private _router: Router,
    private _productService: ProductService,
    public snackbar: MatSnackBar
  ) {
    this.calculateTotal();
  }

  onHomeLinkClick() {
    this._router.navigate(['product-list-page']);
  }

  calculateTotal() {
    const products = this._productService.getCheckoutProducts();

    this.totalOfCard = products.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0
    );
  }

  calculateChange() {
    if (this.amountPaid < this.totalOfCard) {
      this.changeMessage = 'Insufficient amount paid.';
      return;
    }

    let change = this.amountPaid - this.totalOfCard;
    const intervals = [200, 50, 10, 5, 1, 0.5, 0.1];
    let changeBreakdown: { [key: string]: number } = {};

    intervals.forEach((interval) => {
      if (change >= interval) {
        const count = Math.floor(change / interval);
        changeBreakdown[interval] = count;
        change = Number((change % interval).toFixed(2));
      }
    });

    const formatDenomination = (value: number) => {
      if (value < 1) return `${(value * 100).toFixed(0)}c`;
      return `R${value}`;
    };

    this.changeMessage = `Change: R${(
      this.amountPaid - this.totalOfCard
    ).toFixed(2)}. Denominations: \n ${Object.entries(changeBreakdown)
      .map(([key, value]) => `${value} x ${formatDenomination(Number(key))}`)
      .join(',\n ')}`;
  }

  removeFromCheckout(product: Product) {
    this._productService.removeCheckoutProduct(product);
    this.dataSource = this.dataSource.filter((p) => p !== product);
    this.calculateTotal();
  }

  increaseQuantity(element: Product) {
    if (element.quantity < 99) {
      element.quantity++;
      const checkoutList = this._productService.walletList;
      let sumOfCard = 0;
      checkoutList.value.map((p) => {
        sumOfCard += p.quantity * p.price;
      });

      this.totalOfCard = sumOfCard;
    } else {
      this.snackbar.open(
        `Product's Quantity can't be greater than 99`,
        'Close',
        {
          duration: 3000,
        }
      );
    }
  }

  decreaseQuantity(element: Product) {
    if (element.quantity > 1) {
      element.quantity--;
      const checkoutList = this._productService.walletList;
      let sumOfCard = 0;
      checkoutList.value.map((p) => {
        sumOfCard += p.quantity * p.price;
      });
      this.totalOfCard = sumOfCard;
    } else {
      this.snackbar.open(`Product's Quantity can't be less than 1.`, 'Close', {
        duration: 3000,
      });
    }
  }
}
