import {Injectable, Inject} from '@angular/core';
import {API_CONFIGURATION_TOKEN, ApiConfiguration} from "../../../../shared";
import {Http} from "@angular/http";
import {SortingOrder} from "../sorting/sorting-order.enum";
import {Observable, ReplaySubject} from "rxjs";
import {Filter} from "../filter/filter";
import {SelectionMode} from "../filter/article-selection/selection-mode.enum";
import {SortingSelection} from "../filter/sorting-selection/sorting-selection";
import {ArticleSelection} from "../filter/article-selection/article-selection";

@Injectable()
export class ArticlesService {
  private dates: ReplaySubject<Array<string>> = new ReplaySubject<Array<string>>(1);

  constructor(private http: Http, @Inject(API_CONFIGURATION_TOKEN) private apiConfig: ApiConfiguration) {
    this.http.get(`${this.apiConfig.apiBaseAddr}/articles/dates`).map(res => res.json()).subscribe(this.dates);
  }

  getArticleNames(index: number, count: number, sortingOrder: SortingOrder, filter: Filter) {
    const sorting = sortingOrder == SortingOrder.DESC ? '-' : '+';
    const textFilter = filter.textFilter ? `filter=${filter.textFilter}&` : '';

    return this.http.get(`${this.apiConfig.apiBaseAddr}/articles/names?${textFilter}sorting=${sorting}&index=${index}&count=${count}`).map(res => res.json());
  }

  getArticles(index: number, count: number, sortingSelection: SortingSelection, filter: Filter): Observable<any> {
    const sorting = this.buildSortingQuery(sortingSelection);
    const textFilter = filter.textFilter ? `filter=${filter.textFilter}&` : '';
    const rangeFilter = this.buildRangeQuery(filter.articlesFilter);

    return this.http.get(`${this.apiConfig.apiBaseAddr}/articles?${textFilter}${rangeFilter}${sorting}index=${index}&count=${count}`).map(res => res.json()).map(countsData => {
      // flatten data, because the grids don't deal well with nested data
      return countsData.map(countsDate => {
        const accumulator = {
          article: countsDate.article
        }

        return countsDate.counts.reduce((acc, curr) => Object.assign(acc, {[curr.date]: curr.count}), accumulator);
      })
    });
  }

  buildRangeQuery(articleSelection: ArticleSelection): string {
    const modeString: string = articleSelection.mode == SelectionMode.INCLUDING ? 'mode=including' : 'mode=excluding';
    const rangeString: string = articleSelection.ranges.reduce((prev, curr, index) => {
      return `${prev}&range[${index}][from]=${curr.beginning}&range[${index}][to]=${curr.end}`;
    }, '');

    return modeString + rangeString + '&';
  }

  buildSortingQuery(sortingSelection: SortingSelection): string {
    return sortingSelection.sortings.reduce((prev, curr, index) => {
        const orderString = curr.order == SortingOrder.DESC ? '-' : '+';
        return `${prev ? prev + '&' : ""}sorting[${index}]=${orderString}${curr.property}`;
      }, "") + '&';
  }

  getAllAvailableDates(sortingOrder: SortingOrder): Observable<Array<any>> {
    return this.dates.map(dates => {
      let sortedDates = dates.slice().sort();
      if (sortingOrder == SortingOrder.DESC) {
        sortedDates.reverse();
      }

      return sortedDates
    });
  }

  getAvailableDates(index: number, count: number, sortingOrder: SortingOrder) {
    return this.dates.map(dates => {
      let sortedDates = dates.slice().sort();
      if (sortingOrder == SortingOrder.DESC) {
        sortedDates.reverse();
      }

      return sortedDates
    }).map(dates => dates.slice(index, index + count));
  }
}
