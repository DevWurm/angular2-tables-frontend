import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ArticleSelectorComponent} from "./article-selector/article-selector.component";
import {DateSelectorComponent} from "./date-selector/date-selector.component";

@Component({
  selector: 'pc-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css'],
  directives: [ArticleSelectorComponent, DateSelectorComponent]
})
export class FilterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigateToCounts() {
    this.router.navigate(['counts']);
  }

}
