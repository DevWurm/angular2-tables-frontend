import {NgModule, CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import {ArticleSelectorComponent} from "./article-selector/article-selector.component";
import {DatesSelectorComponent} from "./date-selector/dates-selector.component";
import {PolymerElement} from "@vaadin/angular2-polymer";
import {FilterComponent} from "./filter.component";
import {CommonModule} from "@angular/common";
require('!include-loader!../../../../bower_components/vaadin-grid/vaadin-grid.html');
require("!include-loader!../../../../bower_components/paper-button/paper-button.html");
require("!include-loader!../../../../bower_components/paper-styles/paper-styles.html");
require('!include-loader!../../../../bower_components/paper-input/paper-input.html');

@NgModule({
  imports: [ CommonModule ],
  exports: [ FilterComponent ],
  declarations: [
    FilterComponent,
    ArticleSelectorComponent,
    DatesSelectorComponent,
    PolymerElement('paper-button'),
    PolymerElement('vaadin-grid'),
    PolymerElement('paper-input')
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FilterModule { }
