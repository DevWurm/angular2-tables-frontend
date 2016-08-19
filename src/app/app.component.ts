import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FilterService} from "./shared/filter/filter.service";
import {DatesSelectionService} from "./shared/dates-selection/dates-selection.service";
import {ArticleSelectionService} from "./shared/article-selection/article-selection.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    FilterService,
    ArticleSelectionService,
    DatesSelectionService
  ]
})
export class AppComponent {
  title = 'Wikipedia Pagecounts';
}
