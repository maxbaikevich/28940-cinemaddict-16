import AbstractView from './abstract-view';
const createFilmDetailsBottomTemplate = (comments) => (
  `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    </section>
  </div>`
);
export default class FilmDetailsBottomView extends AbstractView {
  #comments = null;
  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsBottomTemplate(this.#comments);
  }
}
