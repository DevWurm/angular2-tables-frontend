import {NgModule, CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { MainComponent } from "./main/main.component";
import {PolymerElement} from "@vaadin/angular2-polymer";
import {routing} from "./app.routing";
import {ConfigFileApiConfigurationService} from "./shared/configuration/config-file-api-configuration.service";
import {API_CONFIGURATION_TOKEN} from "./shared/configuration/api-configuration";
import {HttpModule} from "@angular/http";
import {FilterModule} from "./main/filter/filter.module";
import {CountsModule} from "./main/counts/counts.module";
require("!include-loader!../../bower_components/paper-scroll-header-panel/paper-scroll-header-panel.html");
require("!include-loader!../../bower_components/paper-styles/paper-styles.html");

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FilterModule,
    CountsModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    PolymerElement('paper-scroll-header-panel')
  ],
  providers: [
    {provide: API_CONFIGURATION_TOKEN, useClass: ConfigFileApiConfigurationService}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
