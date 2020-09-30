import dbPromise from './idb';
import CONFIG from '../global/config';

const { DATABASE_USER_OBJECT_STORE } = CONFIG;

const UserIdb = {
  async getUser() {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_USER_OBJECT_STORE, 'readonly');
    const store = tx.objectStore(DATABASE_USER_OBJECT_STORE);
    return store.get(0);
  },
  async updateUser(user) {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_USER_OBJECT_STORE, 'readwrite');
    const store = tx.objectStore(DATABASE_USER_OBJECT_STORE);
    return store.put(user);
  },
  async deleteUser() {
    const db = await dbPromise;
    const tx = db.transaction(DATABASE_USER_OBJECT_STORE, 'readwrite');
    const store = tx.objectStore(DATABASE_USER_OBJECT_STORE);
    return store.delete(0);
  },
};

export default UserIdb;
