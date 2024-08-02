import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-transaction-section',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './home-transaction-section.component.html',
  styleUrl: './home-transaction-section.component.scss'
})
export class HomeTransactionSectionComponent {

  constructor(private _router: Router) {

  }

  onTransactionClick() {
    this._router.navigate(['product-list-page'])
  }
}
