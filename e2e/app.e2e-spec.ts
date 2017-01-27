import { PhinestversionClientPage } from './app.po';

describe('phinestversion-client App', function() {
  let page: PhinestversionClientPage;

  beforeEach(() => {
    page = new PhinestversionClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
