import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {ApiConfiguration, API_CONFIGURATION_TOKEN} from "../../../../../shared";
import {Observable, ReplaySubject} from "rxjs";
import {SortingOrderSelectionService} from "../../../shared/sorting/sorting-order-selection.service";
import {SortingOrder} from "../../../../shared/sorting/sorting-order.enum";
import {DatesFilterService} from "../dates-filter/dates-filter.service";

@Injectable()
export class AvailableDatesService {
  private dates: ReplaySubject<Array<string>> = new ReplaySubject<Array<string>>(1);

  constructor(private http: Http, @Inject(API_CONFIGURATION_TOKEN) private apiConfig: ApiConfiguration, private sortingService: SortingOrderSelectionService, private datesFilter: DatesFilterService) {
    this.http.get(`${this.apiConfig.apiBaseAddr}/dates`).map(res => res.json()).subscribe(this.dates);
  }

  getAllDates(): Observable<Array<any>> {
    return this.dates.map(dates => {
      let sortedDates = dates.slice().sort();
      if (this.sortingService.sortingOrder == SortingOrder.DESC) {
        sortedDates.reverse();
      }

      return sortedDates
    }).map(dates => {
      return dates.filter(dateString => this.datesFilter.isInRange(AvailableDatesService.dateStringToDate(dateString)));
    });
  }

  getDates(index: number, count: number) {
    return this.dates.map(dates => {
      let sortedDates = dates.slice().sort();
      if (this.sortingService.sortingOrder == SortingOrder.DESC) {
        sortedDates.reverse();
      }

      return sortedDates
    }).map(dates => {
      return dates.filter(dateString => this.datesFilter.isInRange(AvailableDatesService.dateStringToDate(dateString)));
    }).map(dates => dates.slice(index, index + count));
  }

  private static dateStringToDate(dateString: string) {
    const match = /(\d{4})-(\d{2})-(\d{2})-(\d{2})/.exec(dateString);
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]));
  }
}
