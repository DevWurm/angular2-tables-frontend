import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {ApiConfiguration, API_CONFIGURATION_TOKEN} from "../../../shared";
import {Observable, ReplaySubject} from "rxjs";

@Injectable()
export class AvailableDatesService {
  private dates: ReplaySubject<Array<string>> = new ReplaySubject<Array<string>>(1);

  constructor(private http: Http, @Inject(API_CONFIGURATION_TOKEN) private apiConfig: ApiConfiguration) {
    this.http.get(`${this.apiConfig.apiBaseAddr}/dates`).map(res => res.json()).map((data: {dates: Array<string>}) => data.dates).subscribe(this.dates);
  }

  getAllDates(): Observable<Array<any>> {
    return this.dates;
  }

  getDates(index: number, count: number) {
    return this.dates.map(dates => dates.slice(index, index + count));
  }

}
