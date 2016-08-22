/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { FilterService } from './filter.service';

describe('Service: Filter', () => {
  beforeEach(() => {
    addProviders([FilterService]);
  });

  it('should ...',
    inject([FilterService],
      (service: FilterService) => {
        expect(service).toBeTruthy();
      }));
});
