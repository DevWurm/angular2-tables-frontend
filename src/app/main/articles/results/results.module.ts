import {NgModule, CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {CommonModule} from "@angular/common";
import {ResultsComponent} from "./results.component";
import {ResultsListVaadinGridModule} from "./results-list-vaadin-grid/results-list-vaadin-grid.module";
require("!include-loader!../../../../../bower_components/paper-button/paper-button.html");
require("!include-loader!../../../../../bower_components/paper-styles/paper-styles.html");
require("!include-loader!../../../../../bower_components/paper-tabs/paper-tabs.html");
require("!include-loader!../../../../../bower_components/paper-tabs/paper-tab.html");
require("!include-loader!../../../../../bower_components/iron-pages/iron-pages.html");

@NgModule({
  imports: [ CommonModule, ResultsListVaadinGridModule ],
  exports: [ ResultsComponent ],
  declarations: [
    ResultsComponent,
    PolymerElement('paper-button'),
    PolymerElement('paper-tabs'),
    PolymerElement('paper-tab'),
    PolymerElement('iron-pages')
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ResultsModule { }
