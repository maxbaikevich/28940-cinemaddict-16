import {createElement} from '../render.js';
const createNavigationItemTemplateElem = (filterDate, isChecked) => {
  const {name, count} = filterDate;
  return (
    `<a href="#${name}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">${name} ${count !==''?`<span class="main-navigation__item-count">${count}</span>`: ''}</a>`
  );
};
const createNavigationItemsTemplate = (filterDate) => {
  const navigationItemTemplate = filterDate
    .map((filter, index)=> createNavigationItemTemplateElem(filter, index === 0))
    .join('');
  return `<div class="main-navigation__items">${navigationItemTemplate}</div>`;
};
export default class NavigationItemsView {
  #element = null;
  #filterDate = null;
  constructor(filterDate) {
    this.#filterDate = filterDate;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createNavigationItemsTemplate( this.#filterDate);
  }

  removeElement() {
    this.#element = null;
  }
}
