import AbstractView from './abstract-view';
const createDetailsControlsTemplate = () => (
  `<section class="film-details__controls"></section>
  `
);
export default class DetailsControlsView extends AbstractView {
  get template() {
    return createDetailsControlsTemplate();
  }
}
