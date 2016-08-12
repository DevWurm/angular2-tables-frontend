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

  private title = "Filter articles";

  @ViewChild('articles-list')
  private articlesList;

  constructor(private articlesService: AvailableArticlesService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.articlesList.items = this.getArticles;
  }


  getArticles(params, callback) {
    this.articlesService.getArticles(params.index, params.count).subscribe(
      data => {
        if ((this.articlesList.size == params.index + params.count) && !(data.length < params.count)) {
          this.articlesList.size += 50;
        }
        callback(data);
      },
      error => console.error(error)
    );
  }
}
