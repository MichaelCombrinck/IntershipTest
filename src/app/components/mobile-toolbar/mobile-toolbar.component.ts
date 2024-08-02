import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatBadgeModule],
  templateUrl: './mobile-toolbar.component.html',
  styleUrl: './mobile-toolbar.component.scss',
})
export class MobileToolbarComponent {
  @Input() checkoutProductAmount: number = 0;

  openMenu: boolean = false;

  // list:[] = [{
  //   key
  // }]

  constructor(private _route: Router) {}

  onMenuClick(): void {
    if (this.openMenu) {
      this.openMenu = true;
    } else {
      this.openMenu = false;
    }
  }

  onWishlistLinkClick() {
    this._route.navigate(['wishlist']);
  }

  onCheckoutCardClick() {
    this._route.navigate(['checkout']);
  }
}
