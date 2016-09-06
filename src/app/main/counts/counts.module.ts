import {NgModule, CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {CommonModule} from "@angular/common";
import {CountsComponent} from "./counts.component";
import {CountsListModule} from "./counts-list/counts-list.module";
import {CountsListPrimengModule} from "./counts-list-primeng/counts-list-primeng.module";
require("!include-loader!../../../../bower_components/paper-button/paper-button.html");
require("!include-loader!../../../../bower_components/paper-styles/paper-styles.html");
require("!include-loader!../../../../bower_components/paper-tabs/paper-tabs.html");
require("!include-loader!../../../../bower_components/paper-tabs/paper-tab.html");
require("!include-loader!../../../../bower_components/iron-pages/iron-pages.html");

@NgModule({
  imports: [ CommonModule, CountsListModule, CountsListPrimengModule ],
  exports: [ CountsComponent ],
  declarations: [
    CountsComponent,
    PolymerElement('paper-button'),
    PolymerElement('paper-tabs'),
    PolymerElement('paper-tab'),
    PolymerElement('iron-pages')
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CountsModule { }
