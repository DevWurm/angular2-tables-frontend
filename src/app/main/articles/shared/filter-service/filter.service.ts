import { Injectable } from '@angular/core';
import {Filter} from "../filter/filter";

@Injectable()
export class FilterService {
  public filter: Filter = new Filter();

  constructor() { }

}
