import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {SortingOrder} from "../../shared/sorting/sorting-order.enum";
import {Sorting} from "../../shared/filter/sorting-selection/sorting";
import {SortingSelection} from "../../shared/filter/sorting-selection/sorting-selection";
import {FilterService} from "../../shared/filter-service/filter.service";
import {ArticlesService} from "../../shared/articles-service/articles.service";

@Component({
  selector: 'pc-results-list-vaadin-grid',
  templateUrl: 'results-list-vaadin-grid.component.html',
  styleUrls: ['results-list-vaadin-grid.component.css']
})
export class ResultsListVaadinGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('resultsList')
  grid: any;

  @ViewChild('sortingTooltip')
  tooltip: any;

  private subscriptions: Array<Subscription> = [];

  private gridSize: number = 10;
  private gridData = this.getCounts.bind(this);

  private sortingSelection: SortingSelection = new SortingSelection([]);

  constructor(private articlesService: ArticlesService, private filterService: FilterService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.grid.nativeElement.then(() => {
      // setup grid columns if grid is loaded
      this.setupColumns(this.grid.nativeElement);

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
    this.subscriptions.push(this.articlesService.getArticles(params.index, params.count, this.sortingSelection, this.filterService.filter).map(countsData => {
      // flatten data, because Vaadin grid doesnt deal well with nested data
      return countsData.map(countsDate => {
        const accumulator = {
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
    ));
  }

  setupColumns(grid: any) {
    this.filterService.filter.datesFilter.forEach(date => {
      grid.addColumn({name: date, hidable: true, sortable: true});
    });
  }

  updateSorting(sortOrder: Array<{column: number, direction: string}>, grid: any) {
    const sortings = sortOrder.map(sort => {
      // get the name of the column from the array of selected dates; if the sorted column is 0 (-> the article column)
      // use the article for sorting-selection otherwise use the colum number decremented by 1 to search in the selected columns
      if (sort.column == 0) {
        const order = sort.direction == 'desc' ? SortingOrder.DESC : SortingOrder.ASC;

        return new Sorting('article', order);
      } else {
        const property =  this.filterService.filter.datesFilter[sort.column - 1];
        const order = sort.direction == 'desc' ? SortingOrder.DESC : SortingOrder.ASC;

        return new Sorting(property, order);
      }
    });

    this.sortingSelection = new SortingSelection(sortings);

    grid.refreshItems();
  }
}
