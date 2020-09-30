import TransactionsHelper from '../../utils/transactions-helper';
import { createMonthBalanceTemplate } from '../templates/template-creator';

class MonthBalance extends HTMLElement {
  set transactions(transactions) {
    this._transactions = transactions;

    this._render();
  }

  async _render() {
    const lastTransactions = TransactionsHelper.getBalanceLastThreeMonth(this._transactions);

    this.innerHTML = '';
    lastTransactions.forEach((transaction) => {
      const { balance } = transaction;
      const month = TransactionsHelper.getEmptyMonthName(transaction.month - 1);
      this.innerHTML += createMonthBalanceTemplate(month, balance);
    });
  }
}

customElements.define('month-balance', MonthBalance);
