/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AvailableDatesService } from './available-dates.service';

describe('Service: AvailableDates', () => {
  beforeEach(() => {
    addProviders([AvailableDatesService]);
  });

  it('should ...',
    inject([AvailableDatesService],
      (service: AvailableDatesService) => {
        expect(service).toBeTruthy();
      }));
});
