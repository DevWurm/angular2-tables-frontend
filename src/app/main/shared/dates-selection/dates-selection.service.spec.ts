/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DatesSelectionService } from './dates-selection.service';

describe('Service: ArticleSelection', () => {
  beforeEach(() => {
    addProviders([DatesSelectionService]);
  });

  it('should ...',
    inject([DatesSelectionService],
      (service: DatesSelectionService) => {
        expect(service).toBeTruthy();
      }));
});
