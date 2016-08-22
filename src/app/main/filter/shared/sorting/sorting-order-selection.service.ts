import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SortingOrder} from "../../../shared/sorting/sorting-order.enum";

@Injectable()
export class SortingOrderSelectionService {
  _sortingOrderSubj: BehaviorSubject<SortingOrder> = new BehaviorSubject(SortingOrder.ASC);

  constructor() { }

  get sortingOrderSubject(): BehaviorSubject<SortingOrder> {
    return this._sortingOrderSubj;
  }

  get sortingOrder(): SortingOrder {
    return this._sortingOrderSubj.getValue();
  }

  set sortingOrder(newOrder: SortingOrder) {
    this._sortingOrderSubj.next(newOrder);
  }

}
