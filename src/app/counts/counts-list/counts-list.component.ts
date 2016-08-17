import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {CountsService} from "./shared/counts/counts.service";
import {DatesSelectionService} from "../../shared/dates-selection/dates-selection.service";
require('!include-loader!../../../../bower_components/vaadin-grid/vaadin-grid.html');

@Component({
  selector: 'pc-counts-list',
  templateUrl: 'counts-list.component.html',
  styleUrls: ['counts-list.component.css'],
  directives: [
    PolymerElement('vaadin-grid')
  ],
  providers: [
    CountsService,
  ]
})
export class CountsListComponent implements OnInit, AfterViewInit {
  @ViewChild('countsList')
  grid: any;

  private gridSize: number = 10;
  private gridData = this.getCounts.bind(this);

  constructor(private countsService: CountsService, private datesService: DatesSelectionService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.grid.nativeElement.then(() => {
      this.setupColumns(this.grid.nativeElement);
    })
  }

  getCounts(params: any, callback: Function) {
    this.countsService.getCounts(params.index, params.count).subscribe(
      data => {
        if ((this.gridSize <= params.index + params.count) && !(data.length < params.count)) {
          this.gridSize += 10;
        }
        callback(data);
      },
      error => console.error(error)
    );
  }

  setupColumns(grid: any) {
    this.datesService.datesSelectionSubject.subscribe(
      dates => {
        console.log(dates);
        dates.forEach(date => {
          grid.addColumn({name: date});
        });
      }
    )
  }
}
