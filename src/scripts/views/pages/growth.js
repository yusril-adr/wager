import '../custom/balance-total';
import '../custom/month-balance';
import content from '../../../templates/content/growth.html';
import TransactionIdb from '../../data/transaction-idb';
import BackBtnInitiator from '../../utils/back-button-initiator';

const growth = {
  async render() {
    return content;
  },

  async afterRender() {
    BackBtnInitiator.init(document.querySelector('.back-trigger'));
    const transactions = await TransactionIdb.getAllTransaction();

    await this._renderTotal(transactions);
    await this._renderLastThreeMonths(transactions);
  },

  async _renderTotal(transactions) {
    const balanceTotal = document.querySelector('balance-total');
    balanceTotal.transactions = transactions;
  },

  async _renderLastThreeMonths(transactions) {
    const monthBalance = document.querySelector('month-balance');
    monthBalance.transactions = transactions;
  },
};

export default growth;
