import '../custom/detail-item';
import content from '../../../templates/content/detail.html';
import BackBtnInitiator from '../../utils/back-button-initiator';
import UrlParser from '../../routes/url-parser';
import TransactionIdb from '../../data/transaction-idb';

const detail = {
  async render() {
    return content;
  },

  async afterRender() {
    BackBtnInitiator.init(document.querySelector('.back-trigger'));
    const { id } = await UrlParser.parseActiveUrlWithoutCombiner();

    await this._renderDetail(id);

    document.querySelector('#delete').addEventListener('click', async (event) => {
      event.stopPropagation();
      await this._deleteEvent(id);
    });
  },

  async _renderDetail(id) {
    const detailItem = document.querySelector('detail-item');
    const transaction = await TransactionIdb.getTransaction(Number.parseInt(id));

    if (transaction) {
      detailItem.transaction = transaction;
    } else {
      detailItem.notFound();
    }
  },

  async _deleteEvent(id) {
    const confirmation = await Swal.fire({
      title: 'Are you sure ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmation.isConfirmed) {
      try {
        await TransactionIdb.deleteTransaction(Number.parseInt(id));
        await Swal.fire({
          icon: 'success',
          title: 'Transaction Deleted Successfully.',
        });
      } catch (error) {
        await Swal.fire(
          'Oops...',
          'Something went wrong!',
          'error',
        );
      } finally {
        history.back();
      }
    }
  },
};

export default detail;
