import { openDB } from 'idb';
import CONFIG from '../global/config';

const {
  DATABASE_NAME,
  DATABASE_VERSION,
  DATABASE_OBJECT_STORE,
  DATABASE_USER_OBJECT_STORE,
  DATABASE_INDEX,
} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database, oldVersion) {
    switch (oldVersion) {
      case 0:
        const objectStore = database.createObjectStore(DATABASE_OBJECT_STORE, { keyPath: 'id' });
        objectStore.createIndex(DATABASE_INDEX, DATABASE_INDEX, { unique: false });
        database.createObjectStore(DATABASE_USER_OBJECT_STORE, { keyPath: 'id' });
    }
  },
});

export default dbPromise;
