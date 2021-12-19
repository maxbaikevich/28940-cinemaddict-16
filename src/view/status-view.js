import {createElement} from '../render.js';
const createStatusTemplate = () => (
  `<a href="#stats" class="main-navigation__additional">
    Stats
  </a>`
);
export default class StatsView {
  #element = null;
  get element () {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createStatusTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
