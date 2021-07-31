import { TestBed } from '@angular/core/testing';

import { DynamicTemplateIvyRenderedOutletService } from './dynamic-template-ivy-rendered-outlet-service';

describe('DynamicTemplateIvyRenderedOutletService', () => {
  let service: DynamicTemplateIvyRenderedOutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicTemplateIvyRenderedOutletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
