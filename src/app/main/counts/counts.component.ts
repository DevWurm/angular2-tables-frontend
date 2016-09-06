import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'pc-counts',
  templateUrl: 'counts.component.html',
  styleUrls: ['counts.component.css']
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
