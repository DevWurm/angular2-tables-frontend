/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SortingSelectionService } from './sorting-selection.service';

describe('Service: SortingSelection', () => {
  beforeEach(() => {
    addProviders([SortingSelectionService]);
  });

  it('should ...',
    inject([SortingSelectionService],
      (service: SortingSelectionService) => {
        expect(service).toBeTruthy();
      }));
});
