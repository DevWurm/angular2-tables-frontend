import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pc-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css'],
})
export class FilterComponent implements OnInit {

  private title = "Filter data";

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  navigateToCounts() {
    this.router.navigate(['../results'], {relativeTo: this.route});
  }

}
