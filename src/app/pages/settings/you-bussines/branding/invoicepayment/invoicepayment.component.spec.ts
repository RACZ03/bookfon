import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicepaymentComponent } from './invoicepayment.component';

describe('InvoicepaymentComponent', () => {
  let component: InvoicepaymentComponent;
  let fixture: ComponentFixture<InvoicepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicepaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
