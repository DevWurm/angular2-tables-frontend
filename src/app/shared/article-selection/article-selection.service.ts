import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ArticleSelection} from "./article-selection";
import {SelectionMode} from "./selection-mode.enum";

@Injectable()
export class ArticleSelectionService {

  private articleSelectionSubj = new BehaviorSubject(new ArticleSelection([], SelectionMode.INCLUDING));

  constructor() { }

  get articleSelection(): ArticleSelection {
    return this.articleSelectionSubj.getValue();
  }

  set articleSelection(selection: ArticleSelection) {
    this.articleSelectionSubj.next(selection);
  }
}
