import {NgModule, CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {CommonModule} from "@angular/common";
import {CountsListComponent} from "./counts-list.component";
require('!include-loader!../../../../../bower_components/vaadin-grid/vaadin-grid.html');
require("!include-loader!../../../../../bower_components/paper-styles/paper-styles.html");
require("!include-loader!../../../../../bower_components/paper-tooltip/paper-tooltip.html");

@NgModule({
  imports: [ CommonModule ],
  exports: [ CountsListComponent ],
  declarations: [
    CountsListComponent,
    PolymerElement('vaadin-grid'),
    PolymerElement('paper-tooltip')
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CountsListModule { }
