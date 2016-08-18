import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {ApiConfiguration, API_CONFIGURATION_TOKEN} from "../../../../shared";
import {ArticleSelectionService} from "../../../../shared/article-selection/article-selection.service";
import {SelectionMode} from "../../../../shared/article-selection/selection-mode.enum";
import {SortingSelectionService} from "../sorting/sorting-selection.service";
import {SortingOrder} from "../../../../shared/sorting/sorting-order.enum";

@Injectable()
export class CountsService {

  constructor(private http: Http, @Inject(API_CONFIGURATION_TOKEN) private apiConfig: ApiConfiguration, private selection: ArticleSelectionService, private sorting: SortingSelectionService) {}

  getAllCounts() {
    return this.http.get(`${this.apiConfig.apiBaseAddr}/counts?${this.getRangeQuery()}${this.getSortingQuery()}`).map(res => res.json());
  }

  getCounts(index: number, count: number) {
    return this.http.get(`${this.apiConfig.apiBaseAddr}/counts?${this.getRangeQuery()}${this.getSortingQuery()}index=${index}&count=${count}`).map(res => res.json());
  }

  getRangeQuery(): string {
    let modeString: string = this.selection.articleSelection.mode == SelectionMode.INCLUDING ? 'mode=including' : 'mode=excluding';
    let rangeString: string = this.selection.articleSelection.ranges.reduce((prev, curr, index) => {
      return `${prev}&range[${index}][from]=${curr.beginning}&range[${index}][to]=${curr.end}`;
    }, '');

    return modeString + rangeString + '&';
  }

  getSortingQuery(): string {
   return this.sorting.sortingSelection.sortings.reduce((prev, curr, index) => {
     let orderString = curr.order == SortingOrder.DESC ? '-' : '+';
     return `${prev ? prev + '&' : ""}sorting[${index}]=${orderString}${curr.property}`;
   },"") + '&';
  }
}
