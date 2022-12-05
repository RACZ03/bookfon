import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookfonServicesComponent } from './bookfon-services.component';

describe('BookfonServicesComponent', () => {
  let component: BookfonServicesComponent;
  let fixture: ComponentFixture<BookfonServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookfonServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookfonServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
