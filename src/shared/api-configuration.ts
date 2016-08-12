import {OpaqueToken} from "@angular/core";
export interface ApiConfiguration {
  apiUrl: String
  apiPort: String
  apiVersion: String
}

export const  API_CONFIGURATION_TOKEN = new OpaqueToken('ApiConfiguration');
