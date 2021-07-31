import { TestBed } from '@angular/core/testing';

import { StaticTemplateIvyRenderedOutletService } from './static-template-ivy-rendered-outlet-service';

describe('StaticTemplateIvyRenderedOutletService', () => {
  let service: StaticTemplateIvyRenderedOutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticTemplateIvyRenderedOutletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
