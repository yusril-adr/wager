import './assets';
import UserIdb from './data/user-idb';
import swRegister from './utils/sw-register';
import App from './views/app';

const initUser = async () => {
  const user = await UserIdb.getUser();

  if (!user) {
    const newUser = {
      id: 0,
      name: 'User',
      email: 'user@mail.com',
    };
    await UserIdb.updateUser(newUser);
  }
};

const app = new App({
  content: document.querySelector('content-wrapper'),
});

window.addEventListener('load', () => {
  swRegister();

  initUser();

  app.renderPage();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
