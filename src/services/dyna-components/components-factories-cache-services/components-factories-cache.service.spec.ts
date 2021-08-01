import { TestBed } from '@angular/core/testing';

import { DynamicComponentsFactoriesAndModulesCacheService } from './components-factories-cache.service';

describe('DynamicComponentsFactoriesAndModulesCacheService', () => {
  let service: DynamicComponentsFactoriesAndModulesCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentsFactoriesAndModulesCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
