
import AbstractView from './abstract-view';
const createFilmTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  </section>`
);
export default class FilmView extends AbstractView {
  get template() {
    return createFilmTemplate();
  }
}
