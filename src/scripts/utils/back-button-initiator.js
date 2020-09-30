const BackBtnInitiator = {
  init(button) {
    button.addEventListener('click', (event) => {
      this._backPage(event);
    });
  },

  _backPage(event) {
    event.stopPropagation();
    history.back();
  },
};

export default BackBtnInitiator;
