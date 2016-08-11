/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AvailiableArticlesService } from './availiable-articles.service';

describe('Service: AvailiableArticles', () => {
  beforeEach(() => {
    addProviders([AvailiableArticlesService]);
  });

  it('should ...',
    inject([AvailiableArticlesService],
      (service: AvailiableArticlesService) => {
        expect(service).toBeTruthy();
      }));
});
