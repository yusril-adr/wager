import content from '../../../templates/content/about.html';
import BackBtnInitiator from '../../utils/back-button-initiator';

const about = {
  async render() {
    return content;
  },

  async afterRender() {
    BackBtnInitiator.init(document.querySelector('.back-trigger'));
  },
};

export default about;
