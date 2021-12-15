import {createElement} from '../render.js';
const createFilmDetailsBottomTemplate = (comments) => (
  `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    </section>
  </div>`
);
export default class FilmDetailsBottomView {
  #element = null;
  #comments = null;
  constructor(comments) {
    this.#comments = comments;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFilmDetailsBottomTemplate(this.#comments);
  }

  removeElement() {
    this.#element = null;
  }
}
