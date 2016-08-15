import { Injectable } from '@angular/core';
import {ApiConfiguration} from "./api-configuration";

const env = require('!json-loader!../config/env.json');
const development = require('!json-loader!../config/development.json');
const production = require('!json-loader!../config/production.json');

@Injectable()
export class ConfigFileApiConfigurationService implements ApiConfiguration {

  private _apiUrl: string;
  private _apiPort: string;
  private _apiVersion: string;

  constructor() {
    if (env.environment == "production") {
      this.setConfiguration(production);
    } else {
      this.setConfiguration(development);
    }
  }

  private setConfiguration(configuration) {
    this._apiUrl = configuration.apiUrl;
    this._apiPort = configuration.apiPort;
    this._apiVersion = configuration.apiVersion;
  }


  get apiUrl(): string {
    return this._apiUrl;
  }

  set apiUrl(value: string) {
    throw new Error('Not allowed to set configuration value after initialization');
  }

  get apiPort(): string {
    return this._apiPort;
  }

  set apiPort(value: string) {
    throw new Error('Not allowed to set configuration value after initialization');
  }

  get apiVersion(): string {
    return this._apiVersion;
  }

  set apiVersion(value: string) {
    throw new Error('Not allowed to set configuration value after initialization');
  }
}
