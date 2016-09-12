import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {FilterComponent} from "./filter/filter.component";
import {ResultsComponent} from "./results/results.component";

const routes: Routes = [
  {
    path: 'articles',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'filter'},
      {path: 'filter', component: FilterComponent},
      {path: 'results', component: ResultsComponent}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
