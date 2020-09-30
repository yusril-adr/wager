import './transaction-item';
import TransactionsHelper from '../../utils/transactions-helper';
import { createListItemTemplate } from '../templates/template-creator';

class ListItem extends HTMLElement {
  set transactions(transactions) {
    const sortedTransactions = transactions.sort((oldest, newest) => newest.id - oldest.id);
    this._transactions = sortedTransactions;

    this._render();
  }

  async _render() {
    const {
      month, date, year, balance,
    } = TransactionsHelper.getAllTotalInDay(this._transactions);

    this.innerHTML = createListItemTemplate({
      month, date, year, balance,
    });

    this._renderAll();
  }

  async _renderAll() {
    this._transactions.forEach((transaction) => {
      const transactionItem = document.createElement('transaction-item');
      transactionItem.transaction = transaction;

      const container = this.querySelector('.card-content');
      container.appendChild(transactionItem);
    });
  }
}

customElements.define('list-item', ListItem);
