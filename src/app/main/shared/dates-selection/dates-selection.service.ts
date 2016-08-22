import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DatesSelectionService {
  private datesSelectionSubj: BehaviorSubject<Array<string>> = new BehaviorSubject([]);

  constructor() {}

  get datesSelection() {
    return this.datesSelectionSubj.getValue();
  }

  get datesSelectionSubject() {
    return this.datesSelectionSubj;
  }

  set datesSelection(newSelection: Array<string>) {
    this.datesSelectionSubj.next(newSelection);
  }
}
