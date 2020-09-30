import home from '../views/pages/home';
import add from '../views/pages/add';
import detail from '../views/pages/detail';
import edit from '../views/pages/edit';
import growth from '../views/pages/growth';
import share from '../views/pages/share';
import save from '../views/pages/save';
import setting from '../views/pages/setting';
import about from '../views/pages/about';

const routes = {
  '/': home, // default page
  '/add': add,
  '/detail/:id': detail,
  '/edit/:id': edit,
  '/growth': growth,
  '/share': share,
  '/save': save,
  '/setting': setting,
  '/about': about,
};

export default routes;
