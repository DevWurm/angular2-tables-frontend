import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {AvailableDatesService} from "./shared/available-dates.service";
import {DatesSelectionService} from "../../shared/dates-selection/dates-selection.service";
require('!include-loader!../../../../bower_components/vaadin-grid/vaadin-grid.html');

@Component({
  selector: 'pc-dates-selector',
  templateUrl: 'dates-selector.component.html',
  styleUrls: ['dates-selector.component.css'],
  directives: [
    PolymerElement('vaadin-grid')
  ],
  providers: [AvailableDatesService]
})
export class DatesSelectorComponent implements OnInit, AfterViewInit {

  @ViewChild('datesList')
  private grid: any;

  private title = "Filter dates";

  private gridSize: number = 10;
  private gridData = this.getDates.bind(this);

  constructor(private datesService: AvailableDatesService, private selectionService: DatesSelectionService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.grid.nativeElement.then(() => {
      this.setupDatesList(this.grid.nativeElement.selection);
    })
  }

  setupDatesList(selection) {
    // resetting the selection mode because setting 'all' in markup causes errors
    selection.mode = 'all';
  }

  getDates(params: any, callback: Function) {
    this.datesService.getDates(params.index, params.count).subscribe(
      data => {
        if ((this.gridSize <= params.index + params.count) && !(data.length < params.count)) {
          this.gridSize += 10;
        } else if ((data.length < params.count)) {
          this.gridSize = params.index + data.length;
        }
        callback(data);
      },
      error => console.error(error)
    );
  }

  updateSelection(selection) {
    if (selection.mode == 'all') {
      this.datesService.getAllDates().subscribe(dates => {
        let deselectedIndices = selection.deselected();

        this.selectionService.datesSelection = dates.filter((date, index) => deselectedIndices.indexOf(index) < 0);
      })
    } else {
      this.datesService.getAllDates().subscribe(dates => {
        let selectedIndices = selection.selected();

        this.selectionService.datesSelection = dates.filter((date, index) => selectedIndices.indexOf(index) >= 0);
      })
    }
  }
}
