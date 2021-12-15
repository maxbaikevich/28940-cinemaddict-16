import {createElement} from '../render.js';
const createFilmDetailsCommentList = () => (
  `<ul class="film-details__comments-list"></ul
  `
);
export default class FilmDetailsCommentListView {
  #element = null;
  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFilmDetailsCommentList();
  }

  removeElement() {
    this.#element = null;
  }
}
