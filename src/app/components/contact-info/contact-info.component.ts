import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  public FullName: string = 'Michael Combrinck';
  public Address: string = '7 Morris str Hillsboro';
  public CellNumber: string = '081 759 6949';
  public Email: string = 'combrim@gmail.com';
}
