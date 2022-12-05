import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxratesComponent } from './add-taxrates.component';

describe('AddTaxratesComponent', () => {
  let component: AddTaxratesComponent;
  let fixture: ComponentFixture<AddTaxratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxratesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
