import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTransactionSectionComponent } from './home-transaction-section.component';

describe('HomeTransactionSectionComponent', () => {
  let component: HomeTransactionSectionComponent;
  let fixture: ComponentFixture<HomeTransactionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTransactionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTransactionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
