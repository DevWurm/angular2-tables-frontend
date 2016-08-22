/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SortingOrderSelectionService } from './sorting-order-selection.service';

describe('Service: SortingOrderSelection', () => {
  beforeEach(() => {
    addProviders([SortingOrderSelectionService]);
  });

  it('should ...',
    inject([SortingOrderSelectionService],
      (service: SortingOrderSelectionService) => {
        expect(service).toBeTruthy();
      }));
});
