import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
require('!include-loader!../../../../../../bower_components/vaadin-date-picker/vaadin-date-picker.html');
require('!include-loader!../../../../../../bower_components/vaadin-combo-box/vaadin-combo-box.html');

@Component({
  selector: 'pc-date-filter',
  templateUrl: 'date-filter.component.html',
  styleUrls: ['date-filter.component.css'],
  directives: [
    PolymerElement('vaadin-date-picker'),
    PolymerElement('vaadin-combo-box')
  ]
})
export class DateFilterComponent implements OnInit {

  private hours: Array<number> = Array.apply(null, Array(24)).map((_, index) => index);

  @Output()
  private beginningChanged: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  private endChanged: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }

  updateBeginning (day: string, hour: number) {
    if (!day) {
      this.beginningChanged.emit(null)
      return;
    }

    const date = new Date(day);
    date.setHours(hour || 0);

    this.beginningChanged.emit(date);
  }

  updateEnd (day: string, hour: number) {
    if (!day) {
      this.endChanged.emit(null);
      return;
    }

    const date = new Date(day);
    date.setHours(hour || 0);

    this.endChanged.emit(date);
  }
}
