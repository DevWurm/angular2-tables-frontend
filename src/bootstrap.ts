import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from "./app/app.module";

platformBrowserDynamic().bootstrapModule(AppModule);

/* TODO: Remove



import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import {appRouterProviders} from "./app/app.routes";
import {HTTP_PROVIDERS} from "@angular/http";
import {API_CONFIGURATION_TOKEN} from "./app/shared/configuration/api-configuration";
import {ConfigFileApiConfigurationService} from "./app/shared/configuration/config-file-api-configuration.service";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [appRouterProviders, HTTP_PROVIDERS, ]);
*/
