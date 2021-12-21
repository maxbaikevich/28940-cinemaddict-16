import AbstractView from './abstract-view';
const createFilmDetailsTemplate = () => (
  `<section class="film-details">
</section>`
);
export default class FilmDetailsView extends AbstractView {
  get template() {
    return createFilmDetailsTemplate();
  }
}
