import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailavilityComponent } from './availavility.component';

describe('AvailavilityComponent', () => {
  let component: AvailavilityComponent;
  let fixture: ComponentFixture<AvailavilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailavilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailavilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
