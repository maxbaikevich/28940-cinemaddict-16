import AbstractView from './abstract-view';
const createFilmDetailsCommentList = () => (
  `<ul class="film-details__comments-list"></ul
  `
);
export default class FilmDetailsCommentListView extends AbstractView {
  get template() {
    return createFilmDetailsCommentList();
  }
}
