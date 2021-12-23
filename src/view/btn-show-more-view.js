import AbstractView from './abstract-view';
const createBtnChowMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>
  `
);

export default class BtnChowMoreView extends AbstractView{
  get template() {
    return createBtnChowMoreTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
