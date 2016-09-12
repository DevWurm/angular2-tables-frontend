import {NgModule} from "@angular/core";
import {routing} from "./articles.routing";
import {ResultsModule} from "./results/results.module";
import {FilterModule} from "./filter/filter.module";
import {ArticlesComponent} from "./articles.component";
import {ArticlesService} from "./shared/articles-service/articles.service";
import {FilterService} from "./shared/filter-service/filter.service";

@NgModule({
  imports: [
    routing,
    ResultsModule,
    FilterModule
  ],
  exports: [
    ArticlesComponent
  ],
  declarations: [
    ArticlesComponent
  ],
  // TODO: Move providers to ArticlesComponente to make them scoped
  providers: [
    ArticlesService,
    FilterService
  ]
})
export class ArticlesModule {}
