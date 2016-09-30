import { Injectable } from '@angular/core';
import {ApiConfiguration} from "./api-configuration";
import {environment} from "../../../environments/environment";

@Injectable()
export class ConfigFileApiConfigurationService implements ApiConfiguration {
  private _apiProtocol = environment.api.apiProtocol;
  private _apiUrl = environment.api.apiUrl;
  private _apiPort = environment.api.apiPort;
  private _apiVersion = environment.api.apiVersion;

  constructor() {}

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
