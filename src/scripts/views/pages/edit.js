import content from '../../../templates/content/edit.html';
import PutButtonInitiator from '../../utils/put-button-initiator';
import BackBtnInitiator from '../../utils/back-button-initiator';
import DateParser from '../../utils/date-parser';
import UrlParser from '../../routes/url-parser';
import TransactionIdb from '../../data/transaction-idb';

const edit = {
  async render() {
    return content;
  },

  async afterRender() {
    BackBtnInitiator.init(document.querySelector('.back-trigger'));
    const { id } = await UrlParser.parseActiveUrlWithoutCombiner();
    const transaction = await TransactionIdb.getTransaction(Number.parseInt(id));

    if (transaction) {
      const transactionElement = {
        name: document.querySelector('#name'),
        credit: document.querySelector('#credit'),
        date: document.querySelector('#date'),
        type: document.querySelector('#type'),
      };

      await this._setDefaultValue(transaction, transactionElement);
      await this._initMaterialize(transaction.full_date);

      PutButtonInitiator.init(transactionElement, {
        button: document.querySelector('#save'),
        isUpdate: true,
        oldTransaction: transaction,
      });
    } else {
      await Swal.fire(
        'Oops...',
        'Something went wrong!',
        'error',
      );

      history.back();
    }
  },

  async _initMaterialize(date) {
    await this._initSelectElement();
    await this._initPickerElement(date);
  },

  async _initSelectElement() {
    const selectInput = document.querySelector('select');
    M.FormSelect.init(selectInput);
  },

  async _initPickerElement(date) {
    const datePicker = document.querySelector('.datepicker');
    const months = DateParser.getMonthFormat();

    M.Datepicker.init(datePicker, {
      defaultDate: new Date(date),
      format: 'mm/dd/yyyy',
      i18n: { months },
      setDefaultDate: true,
    });
  },

  async _setDefaultValue(transaction, {
    name, credit, date, type,
  }) {
    name.value = transaction.name;
    credit.value = transaction.credit;
    date.value = transaction.full_date;
    type.options.selectedIndex = transaction.type.toLowerCase() === 'income' ? 0 : 1;

    M.updateTextFields();
  },
};

export default edit;
