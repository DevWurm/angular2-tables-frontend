import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {AvailableArticlesService} from "./shared/articles/available-articles.service";
import {ArticleRange} from "../../shared/article-selection/article-range";
import {ArticleSelection} from "../../shared/article-selection/article-selection";
import {SelectionMode} from "../../shared/article-selection/selection-mode.enum";
import {ArticleSelectionService} from "../../shared/article-selection/article-selection.service";
import {SortingOrderSelectionService} from "../shared/sorting/sorting-order-selection.service";
import {SortingOrder} from "../../shared/sorting/sorting-order.enum";
import {FilterService} from "../../shared/filter/filter.service";

@Component({
  selector: 'pc-article-selector',
  templateUrl: 'article-selector.component.html',
  styleUrls: ['article-selector.component.css'],
  providers: [
    AvailableArticlesService,
    SortingOrderSelectionService
  ]
})
export class ArticleSelectorComponent implements OnInit, AfterViewInit {

  @ViewChild('articlesList')
  private grid: any;

  private title = "Filter articles";

  private gridSize: number = 10;
  private gridData = this.getArticles.bind(this);

  /* dummy property to bind the input to, to enable the ngModelChanged Event */ private filterText: string;

  constructor(private articlesService: AvailableArticlesService, private selectionService: ArticleSelectionService, private sortingService: SortingOrderSelectionService, private  filterService: FilterService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.grid.nativeElement.then(() => {
      this.setupArticlesList(this.grid.nativeElement.selection);
    })
  }

  setupArticlesList(selection) {
    // resetting the selection mode because setting 'all' in markup causes errors
    selection.mode = 'all';
  }

  getArticles(params: any, callback: Function) {
    this.articlesService.getArticles(params.index, params.count).subscribe(
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

  updateSelection(selection, getItem) {
    if (selection.mode == 'all') {
      this.generateArticleRanges(selection.deselected(), getItem).then(articleRanges => {
        this.selectionService.articleSelection = new ArticleSelection(articleRanges, SelectionMode.EXCLUDING);
      });
    } else {
      this.generateArticleRanges(selection.selected(), getItem).then(articleRanges => {
        this.selectionService.articleSelection = new ArticleSelection(articleRanges, SelectionMode.INCLUDING);
      })
    }
  }

  generateArticleRanges(selections: Array<number>, getItem: Function) {
    let rangePrmss =  selections.sort()
      .reduce((acc: Array<Array<number>>, curr: number) => {
        if (acc.length == 0) {
          return [[curr]];
        } else {
          let initGroups = acc.slice(0, acc.length - 1);
          let lastGroup = acc[acc.length - 1];
          let lastElement = lastGroup[lastGroup.length -1];

          if (lastElement == (curr - 1)) {
            return initGroups.concat([lastGroup.concat(curr)]);
          } else {
            return initGroups.concat([lastGroup, [curr]]);
          }
        }
      }, [])
      .map(rangeIndices => {
        return {beginning: rangeIndices[0], end: rangeIndices[rangeIndices.length -1]};
      })
      .map(rangeBordersIndices => {
        let beginningArticlePrms = new Promise<string>((resolve, reject) => {
          getItem(rangeBordersIndices.beginning, (err, item) => {
            return err ? reject(err) : resolve(item);
          }, false);
        });

        let endArticlePrms = new Promise<string>((resolve, reject) => {
          getItem(rangeBordersIndices.end, (err, item) => {
            return err ? reject(err) : resolve(item);
          }, false);
        });

        return Promise.all([beginningArticlePrms, endArticlePrms]);
      })
      .map(rangePrms => {
        return rangePrms.then(([beginning, end]) => {
          return new ArticleRange(beginning, end);
        })
      });

    return Promise.all(rangePrmss);
  }

  updateSorting(sortingOrder: Array<{column: number, direction: string}>, grid: any) {
    let order = sortingOrder[0].direction == 'desc' ? SortingOrder.DESC : SortingOrder.ASC;

    this.sortingService.sortingOrder = order;

    grid.refreshItems()
  }

  updateFilter(filterText: string, grid: any) {
    this.filterService.filter = filterText;

    grid.refreshItems();
  }
}
