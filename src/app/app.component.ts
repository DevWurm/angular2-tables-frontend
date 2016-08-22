import {Component, ViewEncapsulation} from '@angular/core';
import {MainComponent} from "./main/main.component";
require("!include-loader!../../bower_components/paper-styles/paper-styles.html");

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MainComponent],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
