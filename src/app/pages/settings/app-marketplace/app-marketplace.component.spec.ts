import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMarketplaceComponent } from './app-marketplace.component';

describe('AppMarketplaceComponent', () => {
  let component: AppMarketplaceComponent;
  let fixture: ComponentFixture<AppMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
