import '../custom/total-container';
import '../custom/list-container';
import content from '../../../templates/content/home.html';
import TransactionIdb from '../../data/transaction-idb';
import DateParser from '../../utils/date-parser';
import UserIdb from '../../data/user-idb';

const home = {
  async render() {
    return content;
  },

  async afterRender() {
    await this._initSideNav();

    document.querySelector('.date-trigger').addEventListener('click', async (event) => {
      event.stopPropagation();
      await this._showInput();
    });

    await this._showData(new Date().getMonth(), new Date().getFullYear());
  },

  async _initSideNav() {
    const sidenavElem = document.querySelector('.sidenav');
    const instance = M.Sidenav.init(sidenavElem, { draggable: true });

    await this._renderUser();

    sidenavElem.addEventListener('click', (event) => {
      event.stopPropagation();
      instance.close();
    });
  },

  async _renderUser() {
    const user = await UserIdb.getUser();

    if (user) {
      document.querySelector('.name').innerHTML = user.name;
      document.querySelector('.email').innerHTML = user.email;
    }
  },

  async _showInput() {
    try {
      const { value } = await Swal.mixin({
        showCancelButton: true,
      }).queue([
        {
          title: 'Month',
          input: 'select',
          inputOptions: {
            Jan: 'January',
            Feb: 'February',
            Mar: 'March',
            Apr: 'April',
            May: 'May',
            Jun: 'June',
            Jul: 'July',
            Aug: 'August',
            Sep: 'September',
            Oct: 'October',
            Nov: 'November',
            Dec: 'December',
          },
          inputPlaceholder: 'Select month',
          inputValidator: (result) => {
            if (result === '') {
              return 'Your must select month.';
            }
          },
        },
        {
          title: 'Year',
          input: 'text',
          inputValidator: (result) => {
            if (this._yearCheck(result)) {
              return 'Your input must be number.';
            } if (result.length !== 4) {
              return 'Your input must between 1000-9999';
            }
          },
          inputValue: new Date().getFullYear(),
        },
      ]);

      const month = DateParser.getMonthFormat().indexOf(value[0]);
      const year = value[1];
      this._showData(month, year);
    } catch (error) {
      return;
    }
  },

  _yearCheck(year) {
    const convertedYear = Number.parseInt(year);

    return !Number.isInteger(convertedYear);
  },

  async _showData(month, year) {
    const transactions = await TransactionIdb.getTransactionsByMonthYear(month, year);
    const totalContainer = document.querySelector('total-container');
    const listContainer = document.querySelector('list-container');

    if (transactions.length > 0) {
      totalContainer.transactions = transactions;
      listContainer.transactions = transactions;
    } else {
      totalContainer.monthYearOnly = { month, year };
      listContainer.isEmpty();
    }
  },
};

export default home;
