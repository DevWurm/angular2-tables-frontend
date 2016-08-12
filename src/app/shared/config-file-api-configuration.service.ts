import { Injectable } from '@angular/core';
import {ApiConfiguration} from "./api-configuration";

const env = require('!json-loader!../config/env.json');
const development = require('!json-loader!../config/development.json');
const production = require('!json-loader!../config/production.json');

@Injectable()
export class ConfigFileApiConfigurationService implements ApiConfiguration {

  private _apiUrl: String;
  private _apiPort: String;
  private _apiVersion: String;

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


  get apiUrl(): String {
    return this._apiUrl;
  }

  set apiUrl(value: String) {
    throw new Error('Not allowed to set configuration value after initialization');
  }

  get apiPort(): String {
    return this._apiPort;
  }

  set apiPort(value: String) {
    throw new Error('Not allowed to set configuration value after initialization');
  }

  get apiVersion(): String {
    return this._apiVersion;
  }

  set apiVersion(value: String) {
    throw new Error('Not allowed to set configuration value after initialization');
  }
}
