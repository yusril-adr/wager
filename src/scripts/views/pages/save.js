import content from '../../../templates/content/save.html';
import BackBtnInitiator from '../../utils/back-button-initiator';

const save = {
  async render() {
    return content;
  },

  async afterRender() {
    BackBtnInitiator.init(document.querySelector('.back-trigger'));
  },
};

export default save;
