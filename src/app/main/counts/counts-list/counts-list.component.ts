import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {CountsService} from "./shared/counts/counts.service";
import {DatesSelectionService} from "../../shared/dates-selection/dates-selection.service";
import {Subscription} from "rxjs";
import {SortingSelectionService} from "./shared/sorting/sorting-selection.service";
import {SortingOrder} from "../../shared/sorting/sorting-order.enum";
import {Sorting} from "./shared/sorting/sorting";
import {SortingSelection} from "./shared/sorting/sorting-selection";
require('!include-loader!../../../../../bower_components/vaadin-grid/vaadin-grid.html');
require("!include-loader!../../../../../bower_components/paper-styles/paper-styles.html");

@Component({
  selector: 'pc-counts-list',
  templateUrl: 'counts-list.component.html',
  styleUrls: ['counts-list.component.css'],
  directives: [
    PolymerElement('vaadin-grid')
  ],
  providers: [
    CountsService,
    SortingSelectionService
  ]
})
export class CountsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('countsList')
  grid: any;

  private subscriptions: Array<Subscription> = [];

  private gridSize: number = 10;
  private gridData = this.getCounts.bind(this);

  constructor(private countsService: CountsService, private datesService: DatesSelectionService, private sortingService: SortingSelectionService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.grid.nativeElement.then(() => {
      this.subscriptions.push(this.setupColumns(this.grid.nativeElement));
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getCounts(params: any, callback: Function) {
    this.countsService.getCounts(params.index, params.count).subscribe(
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

  setupColumns(grid: any) {
    return this.datesService.datesSelectionSubject.subscribe(
      dates => {
        dates.forEach(date => {
          grid.addColumn({name: date, hidable: true, sortable: true});
        });
      }
    )
  }

  updateSorting(sortOrder: Array<{column: number, direction: string}>, grid: any) {
    let sortings = sortOrder.map(sort => {
      // get the name of the column from the array of selected dates; if the sorted column is 0 (-> the article column)
      // use the article for sorting otherwise use the colum number decremented by 1 to search in the selected columns
      if (sort.column == 0) {
        let order = sort.direction == 'desc' ? SortingOrder.DESC : SortingOrder.ASC;

        return new Sorting('article', order);
      } else {
        let property = this.datesService.datesSelection[sort.column];
        let order = sort.direction == 'desc' ? SortingOrder.DESC : SortingOrder.ASC;

        return new Sorting(property, order);
      }
    });

    this.sortingService.sortingSelection = new SortingSelection(sortings);

    grid.refreshItems();
  }
}
