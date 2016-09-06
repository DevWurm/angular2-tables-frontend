import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {CountsService} from "./shared/counts/counts.service";
import {DatesSelectionService} from "../../shared/dates-selection/dates-selection.service";
import {Subscription} from "rxjs";
import {SortingSelectionService} from "./shared/sorting/sorting-selection.service";
import {SortingOrder} from "../../shared/sorting/sorting-order.enum";
import {Sorting} from "./shared/sorting/sorting";
import {SortingSelection} from "./shared/sorting/sorting-selection";

@Component({
  selector: 'pc-counts-list',
  templateUrl: 'counts-list.component.html',
  styleUrls: ['counts-list.component.css'],
  providers: [
    CountsService,
    SortingSelectionService
  ]
})
export class CountsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('countsList')
  grid: any;

  @ViewChild('sortingTooltip')
  tooltip: any;

  private subscriptions: Array<Subscription> = [];

  private gridSize: number = 10;
  private gridData = this.getCounts.bind(this);

  constructor(private countsService: CountsService, private datesService: DatesSelectionService, private sortingService: SortingSelectionService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.grid.nativeElement.then(() => {
      // setup grid columns if grid is loaded
      this.subscriptions.push(this.setupColumns(this.grid.nativeElement));

      // re-attach tooltip, when all target elements in the grid are built
      this.tooltip.nativeElement.attached();
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getCounts(params: any, callback: Function) {
    this.countsService.getCounts(params.index, params.count).map(countsData => {
      // flatten data, because Vaadin grid doesnt deal well with nested data
      return countsData.map(countsDate => {
        const accumulator =  {
          article: countsDate.article
        }

        return countsDate.counts.reduce((acc, curr) => Object.assign(acc, {[curr.date]: curr.count}), accumulator);
      })
    }).subscribe(
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
        let property = this.datesService.datesSelection[sort.column - 1];
        let order = sort.direction == 'desc' ? SortingOrder.DESC : SortingOrder.ASC;

        return new Sorting(property, order);
      }
    });

    this.sortingService.sortingSelection = new SortingSelection(sortings);

    grid.refreshItems();
  }
}
