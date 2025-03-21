import { TestBed } from '@angular/core/testing';

import { PlatformStatsService } from './platform-stats.service';

describe('PlatformStatsService', () => {
  let service: PlatformStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
