import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {AvailableArticlesService} from "./shared/available-articles.service";
import {ArticleRange} from "../../shared/article-selection/article-range";
import {ArticleSelection} from "../../shared/article-selection/article-selection";
import {SelectionMode} from "../../shared/article-selection/selection-mode.enum";
import {ArticleSelectionService} from "../../shared/article-selection/article-selection.service";
require('!include-loader!../../../../bower_components/vaadin-grid/vaadin-grid.html');

@Component({
  selector: 'pc-article-selector',
  templateUrl: 'article-selector.component.html',
  styleUrls: ['article-selector.component.css'],
  directives: [
    PolymerElement('vaadin-grid')
  ],
  providers: [AvailableArticlesService]
})
export class ArticleSelectorComponent implements OnInit, AfterViewInit {

  @ViewChild('articlesList')
  private grid: any;

  private title = "Filter articles";

  private gridSize: number = 10;
  private gridData = this.getArticles.bind(this);

  constructor(private articlesService: AvailableArticlesService, private selectionService: ArticleSelectionService) {}

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
            return err ? reject(err) : resolve(item.article);
          }, false);
        });

        let endArticlePrms = new Promise<string>((resolve, reject) => {
          getItem(rangeBordersIndices.end, (err, item) => {
            return err ? reject(err) : resolve(item.article);
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
}
