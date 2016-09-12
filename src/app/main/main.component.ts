import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pc-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
})
export class MainComponent implements OnInit {
  title = 'Wikipedia Pagecounts';

  constructor() { }

  ngOnInit() {
  }

}
