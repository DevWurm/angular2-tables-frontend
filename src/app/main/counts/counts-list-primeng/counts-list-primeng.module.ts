import {NgModule}      from '@angular/core';
import {CommonModule} from "@angular/common";
import {CountsListPrimengComponent} from "./counts-list-primeng.component";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import "!include-loader?script!primeui/primeui-ng-all.min.js";

@NgModule({
  imports: [CommonModule, DataTableModule, SharedModule],
  exports: [CountsListPrimengComponent],
  declarations: [
    CountsListPrimengComponent
  ]
})
export class CountsListPrimengModule {
}
