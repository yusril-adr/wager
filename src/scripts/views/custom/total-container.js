import TransactionsHelper from '../../utils/transactions-helper';
import { createTotalContainerTemplate } from '../templates/template-creator';

class TotalContainer extends HTMLElement {
  set transactions(transactions) {
    this._transactions = transactions;

    this._render();
  }

  set monthYearOnly({ month, year }) {
    this._month = month;
    this._year = year;
    this._renderMonthYear();
  }

  async _render() {
    const totalValue = TransactionsHelper.getAllTotalInMonth(this._transactions);
    this.innerHTML = createTotalContainerTemplate(totalValue);
  }

  async _renderMonthYear() {
    const month = TransactionsHelper.getEmptyMonthName(this._month);
    const year = this._year;
    this.innerHTML = createTotalContainerTemplate({ month, year });
  }
}

customElements.define('total-container', TotalContainer);
