import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {ApiConfiguration, API_CONFIGURATION_TOKEN} from "../../../.";

@Injectable()
export class AvailableArticlesService {

  constructor(private http: Http, @Inject(API_CONFIGURATION_TOKEN) private apiConfig: ApiConfiguration) {}

  getAllArticles() {
    return this.http.get(`${this.apiConfig.apiBaseAddr}/articles`).map(res => res.json());
  }

  getArticles(index: number, count: number) {
    return this.http.get(`${this.apiConfig.apiBaseAddr}/articles?index=${index}&count=${count}`).map(res => res.json());
  }

}
