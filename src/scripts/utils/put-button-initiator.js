import Swal from 'sweetalert2';
import TransactionIdb from '../data/transaction-idb';
import CONFIG from '../global/config';
import DateParser from './date-parser';

const PutButtonInitiator = {
  init(transactionElement = {
    name: null, credit: null, date: null,
  }, { button, isUpdate = false, oldTransaction = null }) {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      this._putTransactionEvent(transactionElement, { isUpdate, oldTransaction });
    });
  },

  async _putTransactionEvent(transactionElement, { isUpdate, oldTransaction }) {
    if (transactionElement.credit.value > CONFIG.TRANSACTION_LIMIT) {
      Swal.fire({
        title: 'Error!',
        text: 'Your credit value is break our limit.',
        icon: 'error',
      });
    } else if (transactionElement.credit.value > 0) {
      if (isUpdate) {
        await this._updateTransaction(transactionElement, oldTransaction);
      } else {
        await this._addTransaction(transactionElement);
      }

      location.href = '';
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Some of your input didn\'t match.',
        icon: 'error',
      });
    }
  },

  async _updateTransaction(transactionElement, oldTransaction) {
    await TransactionIdb.deleteTransaction(Number.parseInt(oldTransaction.id));
    await this._addTransaction(transactionElement);
  },

  async _addTransaction({
    name, credit, date: dateElement, type,
  }) {
    const parsedDate = DateParser.parseDate(dateElement.value);
    const { month, date, year } = parsedDate;
    const { hours, minutes, seconds } = DateParser.parseTimeNow();

    const transaction = {
      name: name.value.trim() || type.value,
      credit: Number.parseInt(credit.value),
      type: type.value,
      full_date: dateElement.value,
      short_date: `${month} ${year}`,
      date,
      month,
      year,
      hours,
      minutes,
      seconds,
      id: DateParser.parseDateToMilisecond({
        month, date, year, hours, minutes, seconds,
      }),
    };

    await TransactionIdb.putTransaction(transaction);
  },
};

export default PutButtonInitiator;
