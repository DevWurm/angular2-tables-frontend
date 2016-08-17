import { Injectable } from '@angular/core';
import {ApiConfiguration} from "./api-configuration";

const env = require('!json-loader!../../config/env.json');
const development = require('!json-loader!../../config/development.json');
const production = require('!json-loader!../../config/production.json');

@Injectable()
export class ConfigFileApiConfigurationService implements ApiConfiguration {
  private _apiProtocol: string;
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
    this._apiProtocol = configuration.apiProtocol;
    this._apiUrl = configuration.apiUrl;
    this._apiPort = configuration.apiPort;
    this._apiVersion = configuration.apiVersion;
  }

  get apiProtocol(): string {
    return this._apiProtocol;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  get apiPort(): string {
    return this._apiPort;
  }

  get apiVersion(): string {
    return this._apiVersion;
  }

  get apiBaseAddr(): string {
    let protocolString = this._apiProtocol ? this._apiProtocol + '://' : '';
    let urlString = this._apiUrl || '';
    let portString = this._apiPort ? ':' + this._apiPort : '';
    let versionString = this._apiVersion || '1';

    return `${protocolString}${urlString}${portString}/api/v${versionString}`;
  }
}
