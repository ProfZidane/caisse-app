import { TestBed } from '@angular/core/testing';

import { SalesOperateService } from './sales-operate.service';

describe('SalesOperateService', () => {
  let service: SalesOperateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesOperateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
