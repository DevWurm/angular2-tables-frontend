import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FilterService} from "./shared/filter/filter.service";
import {ArticleSelectionService} from "./shared/article-selection/article-selection.service";
import {DatesSelectionService} from "./shared/dates-selection/dates-selection.service";

@Component({
  selector: 'pc-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    FilterService,
    ArticleSelectionService,
    DatesSelectionService
  ]
})
export class MainComponent implements OnInit {
  title = 'Wikipedia Pagecounts';

  constructor() { }

  ngOnInit() {
  }

}
