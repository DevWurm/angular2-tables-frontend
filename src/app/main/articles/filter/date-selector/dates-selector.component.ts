import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {SortingOrder} from "../../shared/sorting/sorting-order.enum";
import {ArticlesService} from "../../shared/articles-service/articles.service";
import {FilterService} from "../../shared/filter-service/filter.service";

@Component({
  selector: 'pc-dates-selector',
  templateUrl: 'dates-selector.component.html',
  styleUrls: ['dates-selector.component.css']
})
export class DatesSelectorComponent implements OnInit, AfterViewInit {

  @ViewChild('datesList')
  private grid: any;

  private title = "Filter dates";

  private gridSize: number = 10;
  private gridData = this.getDates.bind(this);

  private sortingOrder: SortingOrder = SortingOrder.ASC;

  constructor(private articlesService: ArticlesService, private resultsFilterService: FilterService) {}

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
    this.articlesService.getAvailableDates(params.index, params.count, this.sortingOrder).subscribe(
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
      this.articlesService.getAllAvailableDates(this.sortingOrder).subscribe(dates => {
        const deselectedIndices = selection.deselected();

        this.resultsFilterService.filter.datesFilter = dates.filter((date, index) => deselectedIndices.indexOf(index) < 0);
      })
    } else {
      this.articlesService.getAllAvailableDates(this.sortingOrder).subscribe(dates => {
        const selectedIndices = selection.selected();

        this.resultsFilterService.filter.datesFilter = dates.filter((date, index) => selectedIndices.indexOf(index) >= 0);
      })
    }
  }

  updateSorting(sortingOrder: Array<{column: number, direction: string}>, grid: any) {
    const order = sortingOrder[0].direction == 'desc' ? SortingOrder.DESC : SortingOrder.ASC;

    this.sortingOrder = order;

    grid.refreshItems()
  }
}
