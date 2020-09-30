const DateParser = {
  parseDate(date) {
    return this._dateSplitter(date);
  },

  parseMonthNow() {
    const now = new Date();
    const month = this.getMonthFormat();
    return month[now.getMonth()];
  },

  parseTimeNow() {
    const now = new Date();
    return this._timeSplitter(`${now.getHours()}/${now.getMinutes()}/${now.getSeconds()}`);
  },

  parseDateToMilisecond({
    month, date, year, hours = 0, minutes = 0, seconds = 0,
  }) {
    return new Date(`${month} ${date}, ${year} ${hours}:${minutes}:${seconds}`).getTime();
  },

  getMonthFormat() {
    return [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
  },

  getFullMonthFormat() {
    return [
      'January',
      'February',
      'Maret',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  },

  _dateSplitter(date) {
    const datesSplits = date.split('/');
    return {
      month: Number.parseInt(datesSplits[0]) || null,
      date: Number.parseInt(datesSplits[1]) || null,
      year: Number.parseInt(datesSplits[2]) || null,
    };
  },

  _timeSplitter(time) {
    const timesSplits = time.split('/');
    return {
      hours: Number.parseInt(timesSplits[0]) || 0,
      minutes: Number.parseInt(timesSplits[1]) || 0,
      seconds: Number.parseInt(timesSplits[2]) || 0,
    };
  },
};

export default DateParser;
