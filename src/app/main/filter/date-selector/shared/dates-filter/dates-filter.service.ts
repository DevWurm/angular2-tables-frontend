import { Injectable } from '@angular/core';

@Injectable()
export class DatesFilterService {
  public filterBeginning: Date = undefined;
  public filterEnd: Date = undefined;

  constructor() { }

  isInRange(date: Date): boolean {
    const inLowerBound = this.filterBeginning ? date >= this.filterBeginning : true;
    const inUpperBound = this.filterEnd ? date <= this.filterEnd : true;

    return inLowerBound && inUpperBound
  }
}
