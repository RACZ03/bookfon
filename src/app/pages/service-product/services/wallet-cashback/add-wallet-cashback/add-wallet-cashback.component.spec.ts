import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletCashbackComponent } from './add-wallet-cashback.component';

describe('AddWalletCashbackComponent', () => {
  let component: AddWalletCashbackComponent;
  let fixture: ComponentFixture<AddWalletCashbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWalletCashbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWalletCashbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
