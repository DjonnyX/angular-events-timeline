import { TestBed } from '@angular/core/testing';

import { EventsImplementationService } from './events-implementation.service';

describe('EventsImplementationService', () => {
  let service: EventsImplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
