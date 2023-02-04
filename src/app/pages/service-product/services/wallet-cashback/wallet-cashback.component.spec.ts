import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCashbackComponent } from './wallet-cashback.component';

describe('WalletCashbackComponent', () => {
  let component: WalletCashbackComponent;
  let fixture: ComponentFixture<WalletCashbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletCashbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletCashbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
