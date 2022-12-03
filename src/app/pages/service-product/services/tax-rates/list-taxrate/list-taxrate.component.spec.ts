import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaxrateComponent } from './list-taxrate.component';

describe('ListTaxrateComponent', () => {
  let component: ListTaxrateComponent;
  let fixture: ComponentFixture<ListTaxrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaxrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTaxrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
