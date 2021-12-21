import AbstractView from './abstract-view.js';
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
export default class NavigationItemsView extends AbstractView {
  #filterDate = null;
  constructor(filterDate) {
    super();
    this.#filterDate = filterDate;
  }

  get template() {
    return createNavigationItemsTemplate( this.#filterDate);
  }
}
