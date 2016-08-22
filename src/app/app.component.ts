import {Component, ViewEncapsulation} from '@angular/core';
import {MainComponent} from "./main/main.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MainComponent],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
