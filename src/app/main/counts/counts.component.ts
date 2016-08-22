import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CountsListComponent} from "./counts-list/counts-list.component";
import {PolymerElement} from "@vaadin/angular2-polymer";
require("!include-loader!../../../../bower_components/paper-button/paper-button.html")

@Component({
  selector: 'app-counts',
  templateUrl: 'counts.component.html',
  styleUrls: ['counts.component.css'],
  directives: [
    CountsListComponent,
    PolymerElement('paper-button')
  ]
})
export class CountsComponent implements OnInit {
  private title = "Pagecounts";

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToFilter() {
    this.router.navigate(['filter']);
  }
}
