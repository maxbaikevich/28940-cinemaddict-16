import AbstractView from './abstract-view.js';
const createStatusTemplate = () => (
  `<a href="#stats" class="main-navigation__additional">
    Stats
  </a>`
);
export default class StatsView extends AbstractView {
  get template() {
    return createStatusTemplate();
  }
}
