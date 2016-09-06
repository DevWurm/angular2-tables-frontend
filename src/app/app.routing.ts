import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {filterRoutes} from "./main/filter/filter.routing";
import {countsRoutes} from "./main/counts/counts.routing";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filter',
    pathMatch: 'full'
  },
  ...filterRoutes,
  ...countsRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
