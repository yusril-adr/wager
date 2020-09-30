import domtoimage from 'dom-to-image';
import content from '../../../templates/content/share.html';
import TransactionIdb from '../../data/transaction-idb';
import UserIdb from '../../data/user-idb';
import BackBtnInitiator from '../../utils/back-button-initiator';
import TransactionsHelper from '../../utils/transactions-helper';

const share = {
  async render() {
    return content;
  },

  async afterRender() {
    BackBtnInitiator.init(document.querySelector('.back-trigger'));

    const username = (await UserIdb.getUser()).name;
    await this._createImage(username);

    document.querySelector('#share').addEventListener('click', async (event) => {
      event.stopPropagation();
      await this._saveImage();
    });
  },

  async _createImage(username) {
    const newestMonth = new Date().getMonth() - 1; // 1 month ago
    let oldestMonth = new Date().getMonth() - 2; // 2 month ago

    const thisYear = new Date().getFullYear();
    let oldYear;

    if (oldestMonth < 0) {
      oldestMonth = 11;
      oldYear = thisYear - 1;
    }

    // eslint-disable-next-line max-len
    const newestTransaction = await TransactionIdb.getTransactionsByMonthYear(newestMonth, thisYear);
    // eslint-disable-next-line max-len
    const oldestTransaction = await TransactionIdb.getTransactionsByMonthYear(oldestMonth, oldYear || thisYear);

    const newestBalance = TransactionsHelper.balanceTotal(newestTransaction) || 0;
    const oldestBalance = TransactionsHelper.balanceTotal(oldestTransaction) || 0;

    const growth = newestBalance - oldestBalance;
    const percentage = Math.round((growth / oldestBalance) * 100);

    document.querySelector('#name').innerHTML = username;
    document.querySelector('#percentage').innerHTML = `${percentage || 0}%`;
  },

  async _saveImage() {
    const imgContainer = document.querySelector('#image');
    this._changeStyleToTop(imgContainer);

    const imageUrl = await domtoimage.toPng(imgContainer);
    const link = document.createElement('a');
    link.download = 'my-growth.png';
    link.href = imageUrl;
    link.click();

    await this._changeStyle(imgContainer);
  },

  async _changeStyleToTop(element) {
    element.style.position = 'absolute';
    element.style.padding = '0 1rem';
    element.style.left = 0;
    element.style.top = 0;
    element.style.zIndex = 9999;
  },

  async _changeStyle(element) {
    element.removeAttribute('style');
  },
};

export default share;
