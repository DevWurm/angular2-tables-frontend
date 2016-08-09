import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'pc-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigateToCounts() {
    this.router.navigate(['counts']);
  }

}
