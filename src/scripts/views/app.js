import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/'];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    // await this._removeLoading();
  }

  async _removeLoading() {
    const loading = document.querySelector('loading-element');
    this._content.removeChild(loading);
  }
}

export default App;
