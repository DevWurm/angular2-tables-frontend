import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {ApiConfiguration, API_CONFIGURATION_TOKEN} from "../../../../shared/configuration/api-configuration";
import {SortingOrderSelectionService} from "../../../shared/sorting/sorting-order-selection.service";
import {SortingOrder} from "../../../../shared/sorting/sorting-order.enum";

@Injectable()
export class AvailableArticlesService {

  constructor(private http: Http, @Inject(API_CONFIGURATION_TOKEN) private apiConfig: ApiConfiguration, private sortingService: SortingOrderSelectionService) {}

  getAllArticles() {
    let order = this.sortingService.sortingOrder == SortingOrder.DESC ? '-' : '+';
    return this.http.get(`${this.apiConfig.apiBaseAddr}/articles?sorting=${order}`).map(res => res.json());
  }

  getArticles(index: number, count: number) {
    let order = this.sortingService.sortingOrder == SortingOrder.DESC ? '-' : '+';
    return this.http.get(`${this.apiConfig.apiBaseAddr}/articles?sorting=${order}&index=${index}&count=${count}`).map(res => res.json());
  }

}
