import {createElement} from '../render.js';
const createDetailsControlsTemplate = () => (
  `<section class="film-details__controls"></section>
  `
);
export default class DetailsControlsView {
  #element = null;
  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createDetailsControlsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
