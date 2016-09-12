import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pc-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css']
})
export class ResultsComponent implements OnInit {
  private title = "Results";
  private selected: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  navigateToFilter() {
    this.router.navigate(['../filter'], {relativeTo: this.route});
  }
}
