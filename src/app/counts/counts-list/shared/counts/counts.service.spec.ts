/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CountsService } from './counts.service';

describe('Service: Counts', () => {
  beforeEach(() => {
    addProviders([CountsService]);
  });

  it('should ...',
    inject([CountsService],
      (service: CountsService) => {
        expect(service).toBeTruthy();
      }));
});
