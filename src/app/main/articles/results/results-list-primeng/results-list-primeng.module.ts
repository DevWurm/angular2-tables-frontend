import {NgModule}      from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ResultsListPrimengComponent} from "./results-list-primeng.component";
import "!include-loader?script!primeui/primeui-ng-all.min.js";
import "!include-loader?style!primeng/resources/primeng.min.css";
import "!include-loader?style!primeng/resources/themes/delta/theme.css";
import "!include-loader?style!font-awesome/css/font-awesome.min.css";

@NgModule({
  imports: [CommonModule, DataTableModule, SharedModule],
  exports: [ResultsListPrimengComponent],
  declarations: [
    ResultsListPrimengComponent
  ]
})
export class ResultsListPrimengModule {
}
