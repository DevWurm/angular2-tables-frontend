/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CountsListComponent } from './counts-list.component';

describe('Component: CountsList', () => {
  it('should create an instance', () => {
    let component = new CountsListComponent(null, null);
    expect(component).toBeTruthy();
  });
});