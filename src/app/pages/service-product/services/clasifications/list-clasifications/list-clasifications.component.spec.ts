import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClasificationsComponent } from './list-clasifications.component';

describe('ListClasificationsComponent', () => {
  let component: ListClasificationsComponent;
  let fixture: ComponentFixture<ListClasificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClasificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClasificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
