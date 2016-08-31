/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DatesFilterService } from './dates-filter.service';

describe('Service: DatesFilter', () => {
  beforeEach(() => {
    addProviders([DatesFilterService]);
  });

  it('should ...',
    inject([DatesFilterService],
      (service: DatesFilterService) => {
        expect(service).toBeTruthy();
      }));
});
