/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ArticleSelectionService } from './article-selection.service';

describe('Service: ArticleSelection', () => {
  beforeEach(() => {
    addProviders([ArticleSelectionService]);
  });

  it('should ...',
    inject([ArticleSelectionService],
      (service: ArticleSelectionService) => {
        expect(service).toBeTruthy();
      }));
});
