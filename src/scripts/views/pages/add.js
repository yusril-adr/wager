import content from '../../../templates/content/add.html';
import PutButtonInitiator from '../../utils/put-button-initiator';
import BackBtnInitiator from '../../utils/back-button-initiator';
import DateParser from '../../utils/date-parser';

const add = {
  async render() {
    return content;
  },

  async afterRender() {
    BackBtnInitiator.init(document.querySelector('.back-trigger'));

    const transactionElement = {
      name: document.querySelector('#name'),
      credit: document.querySelector('#credit'),
      date: document.querySelector('#date'),
      type: document.querySelector('#type'),
    };

    PutButtonInitiator.init(transactionElement, {
      button: document.querySelector('#add'),
    });

    await this._initMaterialize();
  },

  async _initMaterialize() {
    await this._initSelectElement();
    await this._initPickerElement();
  },

  async _initSelectElement() {
    const selectInput = document.querySelectorAll('select');
    M.FormSelect.init(selectInput);
  },

  async _initPickerElement() {
    const datePicker = document.querySelectorAll('.datepicker');
    const months = DateParser.getMonthFormat();

    M.Datepicker.init(datePicker, {
      defaultDate: new Date(),
      format: 'mm/dd/yyyy',
      i18n: { months },
      setDefaultDate: true,
    });
  },
};

export default add;
