/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ArticlesServicesService } from './articles.service';

describe('Service: ArticlesServices', () => {
  beforeEach(() => {
    addProviders([ArticlesServicesService]);
  });

  it('should ...',
    inject([ArticlesServicesService],
      (service: ArticlesServicesService) => {
        expect(service).toBeTruthy();
      }));
});
