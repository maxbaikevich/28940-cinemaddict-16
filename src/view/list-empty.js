import {createElement} from '../render.js';
const listEmtyTemplate = () => (
  `<h2 class="films-list__title">There are no movies in our database</h2>
  `
);
export default class ListTitleEmpty {
    #element = null;
    get element () {
      if(!this.#element) {
        this.#element = createElement(this.template);
      }
      return this.#element;
    }

    get template() {
      return listEmtyTemplate();
    }

    removeElement() {
      this.#element = null;
    }
}
