export class ArticleRange {
  private _beginning: string;
  private _end: string;
  constructor(begining: string, end: string) {
    if (begining > end) throw new Error("Beginning of range mustn't be lexically bigger than end of range");

    this._beginning = begining;
    this._end = end;
  }


  get beginning(): string {
    return this._beginning;
  }

  get end(): string {
    return this._end;
  }
}
