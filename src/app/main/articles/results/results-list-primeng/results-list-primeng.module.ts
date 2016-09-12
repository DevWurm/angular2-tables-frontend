import {NgModule}      from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import "!include-loader?script!primeui/primeui-ng-all.min.js";
import {ResultsListPrimengComponent} from "./results-list-primeng.component";

@NgModule({
  imports: [CommonModule, DataTableModule, SharedModule],
  exports: [ResultsListPrimengComponent],
  declarations: [
    ResultsListPrimengComponent
  ]
})
export class ResultsListPrimengModule {
}
