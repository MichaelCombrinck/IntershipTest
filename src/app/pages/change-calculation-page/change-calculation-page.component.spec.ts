import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCalculationPageComponent } from './change-calculation-page.component';

describe('ChangeCalculationPageComponent', () => {
  let component: ChangeCalculationPageComponent;
  let fixture: ComponentFixture<ChangeCalculationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCalculationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCalculationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
