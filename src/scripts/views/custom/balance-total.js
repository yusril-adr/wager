import TransactionsHelper from '../../utils/transactions-helper';
import { createBalanceTotalTemplate } from '../templates/template-creator';

class BalanceTotal extends HTMLElement {
  set transactions(transactions) {
    this._transactions = transactions;

    this._render();
  }

  async _render() {
    const total = TransactionsHelper.balanceTotal(this._transactions) || 0;
    this.innerHTML = createBalanceTotalTemplate(total);
  }
}

customElements.define('balance-total', BalanceTotal);
