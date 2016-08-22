import {RouterConfig, provideRouter} from "@angular/router";
import {FilterComponent} from "./main/filter/filter.component";
import {CountsComponent} from "./main/counts/counts.component";

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: 'filter',
    pathMatch: 'full'
  },
  {
    path: 'filter',
    component: FilterComponent
  },
  {
    path: 'counts',
    component: CountsComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
