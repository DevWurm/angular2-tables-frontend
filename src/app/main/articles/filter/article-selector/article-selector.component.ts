import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {SortingOrder} from "../../shared/sorting/sorting-order.enum";
import {FilterService} from "../../shared/filter-service/filter.service";
import {ArticlesService} from "../../shared/articles-service/articles.service";
import {SelectionMode} from "../../shared/filter/article-selection/selection-mode.enum";
import {ArticleSelection} from "../../shared/filter/article-selection/article-selection";
import {ArticleRange} from "../../shared/filter/article-selection/article-range";

@Component({
  selector: 'pc-article-selector',
  templateUrl: 'article-selector.component.html',
  styleUrls: ['article-selector.component.css']
})
export class ArticleSelectorComponent implements OnInit, AfterViewInit {

  @ViewChild('articlesList')
  private grid: any;

  private title = "Filter articles";

  private gridSize: number = 10;
  private gridData = this.getArticles.bind(this);

  private sorting: SortingOrder = SortingOrder.ASC;

  /* dummy property to bind the input to, to enable the ngModelChanged Event */ private filterText: string;

  constructor(private articlesService: ArticlesService, private  resultsFilterService: FilterService) {}

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
    this.articlesService.getArticleNames(params.index, params.count, this.sorting, this.resultsFilterService.filter).subscribe(
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
        this.resultsFilterService.filter.articlesFilter = new ArticleSelection(articleRanges, SelectionMode.EXCLUDING);
      });
    } else {
      this.generateArticleRanges(selection.selected(), getItem).then(articleRanges => {
        this.resultsFilterService.filter.articlesFilter = new ArticleSelection(articleRanges, SelectionMode.INCLUDING);
      })
    }
  }

  generateArticleRanges(selections: Array<number>, getItem: Function) {
    const rangePrmss =  selections.sort()
      .reduce((acc: Array<Array<number>>, curr: number) => {
        if (acc.length == 0) {
          return [[curr]];
        } else {
          const initGroups = acc.slice(0, acc.length - 1);
          const lastGroup = acc[acc.length - 1];
          const lastElement = lastGroup[lastGroup.length -1];

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
        const beginningArticlePrms = new Promise<string>((resolve, reject) => {
          getItem(rangeBordersIndices.beginning, (err, item) => {
            return err ? reject(err) : resolve(item);
          }, false);
        });

        const endArticlePrms = new Promise<string>((resolve, reject) => {
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
    const order = sortingOrder[0].direction == 'desc' ? SortingOrder.DESC : SortingOrder.ASC;

    this.sorting = order;

    grid.refreshItems()
  }

  updateFilter(filterText: string, grid: any) {
    this.resultsFilterService.filter.textFilter = filterText;

    grid.refreshItems();
  }
}
