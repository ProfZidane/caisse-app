import { TestBed } from '@angular/core/testing';

import { Pdf2Service } from './pdf-2.service';

describe('Pdf2Service', () => {
  let service: Pdf2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pdf2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
