import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SortingSelection} from "./sorting-selection";

@Injectable()
export class SortingSelectionService {
  private sortingSelectionSubj: BehaviorSubject<SortingSelection> = new BehaviorSubject(new SortingSelection([]));

  constructor() { }

  get sortingSelectionSubject(): BehaviorSubject<SortingSelection> {
    return this.sortingSelectionSubj;
  }

  get sortingSelection(): SortingSelection {
    return this.sortingSelectionSubj.getValue();
  }

  set sortingSelection(newSelection: SortingSelection) {
    this.sortingSelectionSubj.next(newSelection);
  }
}
