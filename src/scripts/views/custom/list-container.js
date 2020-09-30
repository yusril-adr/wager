import './list-item';
import TransactionsHelper from '../../utils/transactions-helper';

class ListContainer extends HTMLElement {
  set transactions(transactions) {
    this._transactions = transactions;

    this._render();
  }

  async _render() {
    const datesInMonth = TransactionsHelper.getAllDateInMonth(this._transactions);

    this.innerHTML = '';
    datesInMonth.forEach((date) => {
      const listItem = document.createElement('list-item');

      // eslint-disable-next-line max-len
      const filteredTransactions = this._transactions.filter((transaction) => transaction.date === date);
      listItem.transactions = filteredTransactions;

      this.appendChild(listItem);
    });
  }

  isEmpty() {
    this.innerHTML = `
      <div class ="empty-message-container">
        <p class="center-align">The list are empty</p>
      </div>
    `;
  }
}

customElements.define('list-container', ListContainer);
