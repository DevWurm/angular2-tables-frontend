/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ArticleSelectorComponent } from './article-selector.component';

describe('Component: ArticleSelector', () => {
  it('should create an instance', () => {
    let component = new ArticleSelectorComponent();
    expect(component).toBeTruthy();
  });
});
