import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FilterService} from "./shared/filter/filter.service";
import {ArticleSelectionService} from "./shared/article-selection/article-selection.service";
import {DatesSelectionService} from "./shared/dates-selection/dates-selection.service";
import {PolymerElement} from "@vaadin/angular2-polymer";
require("!include-loader!../../../bower_components/paper-scroll-header-panel/paper-scroll-header-panel.html");
require("!include-loader!../../../bower_components/paper-styles/paper-styles.html");

@Component({
  selector: 'pc-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    FilterService,
    ArticleSelectionService,
    DatesSelectionService,
    PolymerElement('paper-scroll-header-panel')
  ]
})
export class MainComponent implements OnInit {
  title = 'Wikipedia Pagecounts';

  constructor() { }

  ngOnInit() {
  }

}
