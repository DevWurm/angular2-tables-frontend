import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {ApiConfiguration, API_CONFIGURATION_TOKEN} from "../../../../shared";
import {Observable, ReplaySubject} from "rxjs";
import {SortingOrderSelectionService} from "../../../shared/sorting/sorting-order-selection.service";
import {SortingOrder} from "../../../../shared/sorting/sorting-order.enum";

@Injectable()
export class AvailableDatesService {
  private dates: ReplaySubject<Array<string>> = new ReplaySubject<Array<string>>(1);

  constructor(private http: Http, @Inject(API_CONFIGURATION_TOKEN) private apiConfig: ApiConfiguration, private sortingService: SortingOrderSelectionService) {
    this.http.get(`${this.apiConfig.apiBaseAddr}/dates`).map(res => res.json()).map((data: {dates: Array<string>}) => data.dates).subscribe(this.dates);
  }

  getAllDates(): Observable<Array<any>> {
    return this.dates.map(dates => {
      let sortedDates = dates.slice().sort();
      if (this.sortingService.sortingOrder == SortingOrder.DESC) {
        sortedDates.reverse();
      }

      return sortedDates
    });
  }

  getDates(index: number, count: number) {
    return this.dates.map(dates => {
      let sortedDates = dates.slice().sort();
      if (this.sortingService.sortingOrder == SortingOrder.DESC) {
        sortedDates.reverse();
      }

      return sortedDates
    }).map(dates => dates.slice(index, index + count));
  }

}
