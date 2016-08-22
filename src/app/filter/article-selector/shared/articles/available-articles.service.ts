import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {ApiConfiguration, API_CONFIGURATION_TOKEN} from "../../../../shared";
import {SortingOrderSelectionService} from "../../../shared/sorting/sorting-order-selection.service";
import {SortingOrder} from "../../../../shared/sorting/sorting-order.enum";
import {FilterService} from "../../../../shared/filter/filter.service";

@Injectable()
export class AvailableArticlesService {

  constructor(private http: Http, @Inject(API_CONFIGURATION_TOKEN) private apiConfig: ApiConfiguration, private sortingService: SortingOrderSelectionService, private filterService: FilterService) {}

  getAllArticles() {
    let order = this.sortingService.sortingOrder == SortingOrder.DESC ? '-' : '+';
    let filterString = this.filterService.filter ? `filter=${this.filterService.filter}&`: '';
    return this.http.get(`${this.apiConfig.apiBaseAddr}/articles?${filterString}sorting=${order}`).map(res => res.json());
  }

  getArticles(index: number, count: number) {
    let order = this.sortingService.sortingOrder == SortingOrder.DESC ? '-' : '+';
    let filterString = this.filterService.filter ? `filter=${this.filterService.filter}&`: '';
    return this.http.get(`${this.apiConfig.apiBaseAddr}/articles?${filterString}sorting=${order}&index=${index}&count=${count}`).map(res => res.json());
  }

}
