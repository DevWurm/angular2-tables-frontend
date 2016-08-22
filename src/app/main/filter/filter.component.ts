import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ArticleSelectorComponent} from "./article-selector/article-selector.component";
import {DatesSelectorComponent} from "./date-selector/dates-selector.component";
import {PolymerElement} from "@vaadin/angular2-polymer";
require("!include-loader!../../../../bower_components/paper-button/paper-button.html")
require("!include-loader!../../../../bower_components/paper-styles/paper-styles.html");

@Component({
  selector: 'pc-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css'],
  directives: [
    ArticleSelectorComponent,
    DatesSelectorComponent,
    PolymerElement('paper-button')
  ]
})
export class FilterComponent implements OnInit {

  private title = "Filter data";

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigateToCounts() {
    this.router.navigate(['counts']);
  }

}
