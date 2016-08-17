import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CountsListComponent} from "./counts-list/counts-list.component";

@Component({
  selector: 'app-counts',
  templateUrl: 'counts.component.html',
  styleUrls: ['counts.component.css'],
  directives: [CountsListComponent]
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
