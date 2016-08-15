import {OpaqueToken} from "@angular/core";

export interface ApiConfiguration {
  apiUrl: string;
  apiPort: string;
  apiVersion: string;
}

export const  API_CONFIGURATION_TOKEN = new OpaqueToken('ApiConfiguration');
