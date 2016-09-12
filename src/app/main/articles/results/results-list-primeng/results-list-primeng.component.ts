import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ArticlesService} from "../../shared/articles-service/articles.service";
import {FilterService} from "../../shared/filter-service/filter.service";
import {SortingSelection} from "../../shared/filter/sorting-selection/sorting-selection";
import {Sorting} from "../../shared/filter/sorting-selection/sorting";
import {SortingOrder} from "../../shared/sorting/sorting-order.enum";

@Component({
  selector: 'pc-results-list-primeng',
  templateUrl: 'results-list-primeng.component.html',
  styleUrls: ['results-list-primeng.component.css']
})
export class ResultsListPrimengComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  private articlesData: Array<any> = [];
  private rows: number = 15;
  private gridSize: number = 3 * this.rows;

  private columns: Array<any> = [{field: 'article', header: "Article", sortable: true}];

  constructor(private articlesService: ArticlesService, private filterService: FilterService) { }

  ngOnInit() {
    this.setupColumns();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getArticles(params) {
    const sortingSelection = new SortingSelection(params.sortField ? [new Sorting(params.sortField, params.sortOrder == -1 ? SortingOrder.DESC : SortingOrder.ASC)] : []);
    this.subscriptions.push(this.articlesService.getArticles(params.first, params.rows, sortingSelection, this.filterService.filter).subscribe(
      data => {
        if ((this.gridSize <= params.first + params.rows) && !(data.length < params.rows)) {
          this.gridSize += this.rows;
        } else if ((data.length < params.rows)) {
          this.gridSize = params.first + data.length;
        }

        this.articlesData = data
      },
      error => console.error(error)
    ));
  }

  setupColumns() {
    this.filterService.filter.datesFilter.forEach(date => {
      this.columns = this.columns.concat({field: date, header: date, sortable: true});
    });
  }
}
