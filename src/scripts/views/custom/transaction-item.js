import { createTransactionItemTemplate } from '../templates/template-creator';

class TransactionItem extends HTMLElement {
  set transaction(transaction) {
    this._transaction = transaction;

    this._render();
  }

  async _render() {
    this.innerHTML = createTransactionItemTemplate(this._transaction);
  }
}

customElements.define('transaction-item', TransactionItem);
