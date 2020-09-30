import { createDetailItemTemplate } from '../templates/template-creator';

class DetailItem extends HTMLElement {
  set transaction(transaction) {
    this._transaction = transaction;

    this._render();
  }

  async _render() {
    this.innerHTML = createDetailItemTemplate(this._transaction);
  }

  notFound() {
    this.innerHTML = `
    <div class ="empty-message-container">
      <p class="center-align">Transaction not Found</p>
    </div>
  `;
  }
}

customElements.define('detail-item', DetailItem);
