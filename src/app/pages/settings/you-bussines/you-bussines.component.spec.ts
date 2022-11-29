import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouBussinesComponent } from './you-bussines.component';

describe('YouBussinesComponent', () => {
  let component: YouBussinesComponent;
  let fixture: ComponentFixture<YouBussinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouBussinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouBussinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
