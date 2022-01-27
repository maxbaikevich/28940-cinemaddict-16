import AbstractView from './abstract-view';

export default class MainContent extends AbstractView {

  get template() {
    return '<section class="films"> </section>';
  }
}
