import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedExternalComponent } from './linked-external.component';

describe('LinkedExternalComponent', () => {
  let component: LinkedExternalComponent;
  let fixture: ComponentFixture<LinkedExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedExternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
