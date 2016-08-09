import { Component, OnInit } from '@angular/core';
import {PolymerElement} from "@vaadin/angular2-polymer";

@Component({
  selector: 'pc-article-selector',
  templateUrl: 'article-selector.component.html',
  styleUrls: ['article-selector.component.css'],
  directives: [
    PolymerElement('vaadin-grid')
  ]
})
export class ArticleSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
