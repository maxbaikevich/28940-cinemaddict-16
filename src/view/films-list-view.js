import AbstractView from './abstract-view';
const createFilmListTemplate = () => (
  `<div class="films-list__container"></div>
  `
);
export default class FilmListView extends AbstractView{
  get template() {
    return createFilmListTemplate();
  }
}
