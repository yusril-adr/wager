import DateParser from './date-parser';

const TransactionsHelper = {
  getAllTotalInMonth(transactions) {
    const total = {
      income: this.incomeTotal(transactions),
      cash: this.cashTotal(transactions),
      balance: this.balanceTotal(transactions),
      month: DateParser.getFullMonthFormat()[this.getAttributeValue(transactions, 'month') - 1],
      year: this.getAttributeValue(transactions, 'year'),
    };

    return total;
  },

  getAllTotalInDay(transactions) {
    const total = {
      month: DateParser.getMonthFormat()[this.getAttributeValue(transactions, 'month') - 1],
      date: this.getAttributeValue(transactions, 'date'),
      year: this.getAttributeValue(transactions, 'year'),
      balance: this.balanceTotal(transactions),
    };

    return total;
  },

  getAllDateInMonth(transactions) {
    const datesInTransactions = [];

    transactions.forEach((transaction) => {
      const { date } = transaction;
      if (!datesInTransactions.includes(date)) {
        datesInTransactions.push(date);
      }
    });

    return datesInTransactions.sort((oldest, newest) => newest - oldest);
  },

  getEmptyMonthName(month) {
    return DateParser.getFullMonthFormat()[month];
  },

  getBalanceLastThreeMonth(transactions) {
    const currentMonth = new Date().getMonth() + 1;

    const lastMonthTransactions = [];

    // eslint-disable-next-line no-plusplus
    for (let month = 1; month <= 3; month++) {
      const lastMonth = currentMonth - month;

      // eslint-disable-next-line max-len
      const filteredTransactions = transactions.filter((transaction) => transaction.month === lastMonth);

      const monthTransaction = {
        month: lastMonth,
        balance: this.balanceTotal(filteredTransactions) || 0,
      };

      lastMonthTransactions.push(monthTransaction);
    }

    return lastMonthTransactions.sort((oldest, newest) => newest.month - oldest.month);
  },

  incomeTotal(transactions) {
    let income = 0;

    const filteredTransactions = transactions.filter((transaction) => transaction.type.toLowerCase() === 'income');
    filteredTransactions.forEach((transaction) => {
      income += transaction.credit;
    });

    return income;
  },

  cashTotal(transactions) {
    let cash = 0;

    const filteredTransactions = transactions.filter((transaction) => transaction.type.toLowerCase() === 'cash');
    filteredTransactions.forEach((transaction) => {
      cash += transaction.credit;
    });

    return cash;
  },

  balanceTotal(transactions) {
    const income = this.incomeTotal(transactions);
    const cash = this.cashTotal(transactions);

    return income - cash;
  },

  getAttributeValue(transactions, attribute) {
    if (transactions.length > 0) {
      return transactions[0][attribute];
    }
  },
};

export default TransactionsHelper;
