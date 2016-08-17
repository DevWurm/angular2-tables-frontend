/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ConfigFileApiConfigurationService } from './config-file-api-configuration.service';

describe('Service: ConfigFileApiConfiguation', () => {
  beforeEach(() => {
    addProviders([ConfigFileApiConfigurationService]);
  });

  it('should ...',
    inject([ConfigFileApiConfigurationService],
      (service: ConfigFileApiConfigurationService) => {
        expect(service).toBeTruthy();
      }));
});
