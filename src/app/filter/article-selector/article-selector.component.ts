import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";
import {AvailableArticlesService} from "./shared/available-articles.service";
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

  constructor(private articlesService: AvailableArticlesService) {
  }

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

  updateSelection(selection) {
    if (selection.mode == 'all') {
      console.log(selection.deselected());
    } else {
      console.log(selection.selected());
    }
  }
}
