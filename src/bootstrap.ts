import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import {appRouterProviders} from "./app/app.routes";
import {HTTP_PROVIDERS} from "@angular/http";
import {API_CONFIGURATION_TOKEN} from "./app/shared/configuration/api-configuration";
import {ConfigFileApiConfigurationService} from "./app/shared/configuration/config-file-api-configuration.service";
import {ArticleSelectionService} from "./app/shared/article-selection/article-selection.service";
import {DatesSelectionService} from "./app/shared/dates-selection/dates-selection.service";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [appRouterProviders, HTTP_PROVIDERS, {provide: API_CONFIGURATION_TOKEN, useClass: ConfigFileApiConfigurationService}, ArticleSelectionService, DatesSelectionService]);
