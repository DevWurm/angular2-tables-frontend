import {ArticleSelection} from "./article-selection/article-selection";
import {SelectionMode} from "./article-selection/selection-mode.enum";
export class Filter {
  public textFilter: string = "";
  public articlesFilter: ArticleSelection = new ArticleSelection([], SelectionMode.EXCLUDING);
  public datesFilter: Array<string> = [];
}
