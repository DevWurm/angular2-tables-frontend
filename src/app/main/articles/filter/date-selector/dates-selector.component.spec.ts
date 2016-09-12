/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { DatesSelectorComponent } from './dates-selector.component';

describe('Component: DatesSelector', () => {
  it('should create an instance', () => {
    let component = new DatesSelectorComponent(null, null);
    expect(component).toBeTruthy();
  });
});
