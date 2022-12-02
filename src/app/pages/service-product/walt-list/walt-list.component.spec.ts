import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaltListComponent } from './walt-list.component';

describe('WaltListComponent', () => {
  let component: WaltListComponent;
  let fixture: ComponentFixture<WaltListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaltListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaltListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
