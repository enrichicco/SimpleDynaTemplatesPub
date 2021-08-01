import { TestBed } from '@angular/core/testing';

import { EagerCompsCacheService } from './eager-comps-cache.service';

describe('DynamicComponentsFactoriesAndModulesCacheService', () => {
  let service: EagerCompsCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EagerCompsCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
