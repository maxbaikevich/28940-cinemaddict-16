import {createElement} from '../render.js';
const createFilmListTemplate = () => (
  `<div class="films-list__container"></div>
  `
);
export default class FilmListView {
  #element = null;
  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFilmListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
