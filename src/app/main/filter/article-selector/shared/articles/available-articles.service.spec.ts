/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AvailableArticlesService } from './available-articles.service';

describe('Service: AvailiableArticles', () => {
  beforeEach(() => {
    addProviders([AvailableArticlesService]);
  });

  it('should ...',
    inject([AvailableArticlesService],
      (service: AvailableArticlesService) => {
        expect(service).toBeTruthy();
      }));
});
