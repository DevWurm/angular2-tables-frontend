import {ArticleRange} from "./article-range";
import {SelectionMode} from "./selection-mode.enum";

export class ArticleSelection {
  constructor(private _ranges: Array<ArticleRange>, private _mode: SelectionMode) {}

  get ranges(): Array<ArticleRange> {
    return this._ranges;
  }

  get mode(): SelectionMode {
    return this._mode;
  }
}
