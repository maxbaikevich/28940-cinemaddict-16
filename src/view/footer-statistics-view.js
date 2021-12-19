import {createElement} from '../render.js';
const createFooterStatistics = (movie) => (
  `<p>${movie.length} movies inside</p>
  `
);
export default class FooterStatisticsView {
  #element = null;
  #movie = null;
  constructor(movie) {
    this.#movie = movie;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFooterStatistics(this.#movie);
  }

  removeElement() {
    this.#element = null;
  }
}
