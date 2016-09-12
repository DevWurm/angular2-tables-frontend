/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { FilterServiceService } from './filter.service';

describe('Service: FilterService', () => {
  beforeEach(() => {
    addProviders([FilterServiceService]);
  });

  it('should ...',
    inject([FilterServiceService],
      (service: FilterServiceService) => {
        expect(service).toBeTruthy();
      }));
});
