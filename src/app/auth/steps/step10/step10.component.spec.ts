import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step10Component } from './step10.component';

describe('Step10Component', () => {
  let component: Step10Component;
  let fixture: ComponentFixture<Step10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
