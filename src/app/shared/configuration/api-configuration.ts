import {OpaqueToken} from "@angular/core";

export interface ApiConfiguration {
  apiProtocol: string;
  apiUrl: string;
  apiPort: string;
  apiVersion: string;
  apiBaseAddr: string;
}

export const  API_CONFIGURATION_TOKEN = new OpaqueToken('ApiConfiguration');
