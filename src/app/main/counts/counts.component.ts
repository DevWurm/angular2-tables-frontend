import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CountsListComponent} from "./counts-list/counts-list.component";
import {PolymerElement} from "@vaadin/angular2-polymer";
require("!include-loader!../../../../bower_components/paper-button/paper-button.html");
require("!include-loader!../../../../bower_components/paper-tabs/paper-tabs.html");
require("!include-loader!../../../../bower_components/paper-tabs/paper-tab.html");
require("!include-loader!../../../../bower_components/iron-pages/iron-pages.html");

@Component({
  selector: 'app-counts',
  templateUrl: 'counts.component.html',
  styleUrls: ['counts.component.css'],
  directives: [
    CountsListComponent,
    PolymerElement('paper-button'),
    PolymerElement('paper-tabs'),
    PolymerElement('paper-tab'),
    PolymerElement('iron-pages')
  ]
})
export class CountsComponent implements OnInit {
  private title = "Pagecounts";
  private selected: number = 0;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToFilter() {
    this.router.navigate(['filter']);
  }
}
