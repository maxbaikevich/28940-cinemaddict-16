import {createElement} from '../render.js';
const createBtnChowMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>
  `
);

export default class BtnChowMoreView {
  #element = null;
  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createBtnChowMoreTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
