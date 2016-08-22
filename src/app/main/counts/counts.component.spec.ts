/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CountsComponent } from './counts.component';

describe('Component: Counts', () => {
  it('should create an instance', () => {
    let component = new CountsComponent();
    expect(component).toBeTruthy();
  });
});
