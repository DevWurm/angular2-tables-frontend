import { Component, OnInit } from '@angular/core';
import {FilterService} from "./shared/filter-service/filter.service";
import {ArticlesService} from "./shared/articles-service/articles.service";

@Component({
  selector: 'pc-articles',
  templateUrl: 'articles.component.html',
  styleUrls: ['articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
