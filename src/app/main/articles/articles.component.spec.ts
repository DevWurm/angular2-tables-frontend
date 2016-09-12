/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';

describe('Component: Articles', () => {
  it('should create an instance', () => {
    let component = new ArticlesComponent();
    expect(component).toBeTruthy();
  });
});
