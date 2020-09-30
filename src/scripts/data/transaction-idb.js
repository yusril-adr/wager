import dbPromise from './idb';
import CONFIG from '../global/config';

const {
  DATABASE_OBJECT_STORE, DATABASE_INDEX,
} = CONFIG;

const TransactionIdb = {
  async getTransaction(id) {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_OBJECT_STORE, 'readonly');
    const store = tx.objectStore(DATABASE_OBJECT_STORE);
    return store.get(id);
  },
  async getTransactionsByMonthYear(month, year) {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_OBJECT_STORE, 'readonly');
    const store = tx.objectStore(DATABASE_OBJECT_STORE);
    const index = store.index(DATABASE_INDEX);
    return index.getAll(`${month + 1} ${year}`);
  },
  async getAllTransaction() {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_OBJECT_STORE, 'readonly');
    const store = tx.objectStore(DATABASE_OBJECT_STORE);
    return store.getAll();
  },
  async putTransaction(transaction) {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_OBJECT_STORE, 'readwrite');
    const store = tx.objectStore(DATABASE_OBJECT_STORE);
    return store.put(transaction);
  },
  async deleteTransaction(id) {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_OBJECT_STORE, 'readwrite');
    const store = tx.objectStore(DATABASE_OBJECT_STORE);
    return store.delete(id);
  },
  async deleteAllTransaction() {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_OBJECT_STORE, 'readwrite');
    const store = tx.objectStore(DATABASE_OBJECT_STORE);
    return store.clear();
  },
};

export default TransactionIdb;
