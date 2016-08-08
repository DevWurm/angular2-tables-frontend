import { Angular2TablesFrontendPage } from './app.po';

describe('angular2-tables-frontend App', function() {
  let page: Angular2TablesFrontendPage;

  beforeEach(() => {
    page = new Angular2TablesFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
