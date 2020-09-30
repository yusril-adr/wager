import content from '../../../templates/content/setting.html';
import TransactionIdb from '../../data/transaction-idb';
import UserIdb from '../../data/user-idb';
import BackBtnInitiator from '../../utils/back-button-initiator';

const setting = {
  async render() {
    return content;
  },

  async afterRender() {
    BackBtnInitiator.init(document.querySelector('.back-trigger'));

    const nameElement = document.querySelector('#name');
    const emailElement = document.querySelector('#email');
    await this._initMaterialize(nameElement, emailElement);

    document.querySelector('#delete').addEventListener('click', async (event) => {
      event.stopPropagation();

      if (await this._getConfirm()) {
        await TransactionIdb.deleteAllTransaction();
        await this._showDeleteSuccessAlert();
      }
    });

    document.querySelector('#save').addEventListener('click', async (event) => {
      event.stopPropagation();
      if (nameElement.value.length > 12) {
        this._showMaxAlert();
      } else if (await this._inputCheck(nameElement, emailElement)) {
        await this._saveUser(nameElement, emailElement);
        this._showSaveSuccessAlert();
      } else {
        this._showEmptyAlert();
      }
    });
  },

  async _initMaterialize(nameElement, emailElement) {
    const user = await UserIdb.getUser();

    if (user) {
      nameElement.setAttribute('placeholder', user.name);
      emailElement.setAttribute('placeholder', user.email);
    }

    M.updateTextFields();
  },

  async _getConfirm() {
    const confirmation = await Swal.fire({
      title: 'Are you sure ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    return confirmation.isConfirmed;
  },

  async _showDeleteSuccessAlert() {
    await Swal.fire(
      'Deleted',
      'All your transaction is deleted successfully.',
      'success',
    );
  },

  async _inputCheck(nameElement, emailElement) {
    return !emailElement.classList.contains('invalid') && (nameElement.value.trim() !== '' || emailElement.value.trim() !== '');
  },

  async _saveUser(nameElement, emailElement) {
    const user = await UserIdb.getUser();

    const newUser = {
      id: 0,
      name: nameElement.value.trim() || user.name,
      email: emailElement.value.trim() || user.email,
    };

    await UserIdb.updateUser(newUser);
  },

  async _showMaxAlert() {
    await Swal.fire(
      'Error!',
      'Name character maximum is 12',
      'error',
    );
  },

  async _showSaveSuccessAlert() {
    await Swal.fire(
      'Saved',
      'Your data is saved successfully.',
      'success',
    );
  },

  async _showEmptyAlert() {
    await Swal.fire(
      'Error!',
      'Some of your input didn\'t match.',
      'error',
    );
  },
};

export default setting;
