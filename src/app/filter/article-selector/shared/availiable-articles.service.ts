import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {ApiConfiguration} from "../../../shared/api-configuration";

@Injectable()
export class AvailiableArticlesService {

  private apiAddr: String;

  constructor(private http: Http, @Inject('ApiConfiguration') private apiConfig: ApiConfiguration) {
    this.apiAddr = `${this.apiConfig.apiUrl ? this.apiConfig.apiUrl : ""}${this.apiConfig.apiPort ? ":" + this.apiConfig.apiPort: ""}api/v${this.apiConfig.apiVersion}/`
  }

  getAllArticles() {
    return this.http.get(`${this.apiAddr}/articles`).map(res => res.json());
  }

  getArticles(index: number, count: number) {
    return this.http.get(`${this.apiAddr}/articles?index=${index}&count=${count}`).map(res => res.json());
  }

}
