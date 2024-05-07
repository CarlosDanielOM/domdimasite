import { TestBed } from '@angular/core/testing';

import { EventsubService } from './eventsub.service';

describe('EventsubService', () => {
  let service: EventsubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
