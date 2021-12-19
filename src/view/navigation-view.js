
import {createElement} from '../render.js';
const createNavigationTemplate = () => (
  `<nav class="main-navigation"></nav>
  `
);
export default class NavigationView  {
  #element = null;
  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createNavigationTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
