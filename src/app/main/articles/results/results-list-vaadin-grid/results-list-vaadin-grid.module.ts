import {NgModule, CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {CommonModule} from "@angular/common";
import {ResultsListVaadinGridComponent} from "./results-list-vaadin-grid.component";
require('!include-loader!../../../../../../bower_components/vaadin-grid/vaadin-grid.html');
require("!include-loader!../../../../../../bower_components/paper-styles/paper-styles.html");
require("!include-loader!../../../../../../bower_components/paper-tooltip/paper-tooltip.html");

@NgModule({
  imports: [ CommonModule ],
  exports: [ ResultsListVaadinGridComponent ],
  declarations: [
    ResultsListVaadinGridComponent,
    PolymerElement('vaadin-grid'),
    PolymerElement('paper-tooltip')
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ResultsListVaadinGridModule { }
