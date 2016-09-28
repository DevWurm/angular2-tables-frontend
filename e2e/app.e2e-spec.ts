import { WikiviewsFrontend2Page } from './app.po';

describe('wikiviews-frontend2 App', function() {
  let page: WikiviewsFrontend2Page;

  beforeEach(() => {
    page = new WikiviewsFrontend2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
