import { TestBed } from '@angular/core/testing';

import { EventWorkshopService } from './event-workshop.service';

describe('EventWorkshopService', () => {
  let service: EventWorkshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventWorkshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
