import {createElement} from '../render.js';
const createFilmDetailsTemplate = () => (
  `<section class="film-details">
</section>`
);
export default class FilmDetailsView {
  #element= null;
  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFilmDetailsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
