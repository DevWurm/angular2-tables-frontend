import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class FilterService {
  private filterSubj: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  get filterSubject(): BehaviorSubject<string> {
    return this.filterSubj;
  }

  get filter(): string {
    return this.filterSubj.getValue();
  }

  set filter(newFilter: string) {
    this.filterSubj.next(newFilter);
  }
}
