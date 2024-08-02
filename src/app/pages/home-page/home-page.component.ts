import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ContactInfoComponent } from '../../components/contact-info/contact-info.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { HomeTransactionSectionComponent } from '../../components/home-transaction-section/home-transaction-section.component';

export interface NavItems {
  Name: string;
  IsActive: boolean;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ContactInfoComponent,
    MatToolbarModule,
    HomeTransactionSectionComponent,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  public topNavLinkIsActive: NavItems[] = [
    {
      Name: 'Home',
      IsActive: true,
    },
    {
      Name: 'About Me',
      IsActive: false,
    },
    {
      Name: 'Skills',
      IsActive: false,
    },
    {
      Name: 'Qualifications',
      IsActive: false,
    },
  ];

  public skills = [
    { name: 'Angular', level: 'Advanced' },
    { name: 'React', level: 'Beginner' },
    { name: 'Java', level: 'Advanced' },
    { name: 'C# Asp.Net Core', level: 'Intermediate' },
    { name: 'Python', level: 'Advanced' },
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'MVC', level: 'Intermediate' },
    { name: 'C# WPF', level: 'Beginner' },
  ];

  onNavClick(index: number): void {
    this.topNavLinkIsActive[index].IsActive =
      !this.topNavLinkIsActive[index].IsActive;

    if (this.topNavLinkIsActive[index].IsActive) {
      this.topNavLinkIsActive.forEach((item, i) => {
        if (i !== index) {
          item.IsActive = false;
        }
      });
    }
  }
}
