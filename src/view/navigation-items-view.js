const createNavigationItemTemplate = (filterDate, isChecked) => {
  const {name, count} = filterDate;
  return (
    `<a href="#${name}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">${name} ${count !==''?`<span class="main-navigation__item-count">${count}</span>`: ''}</a>`
  );
};
export const createNavigationItemsTemplate = (filterDate) => {
  const navigationItemTemplate = filterDate
    .map((filter, index)=> createNavigationItemTemplate(filter, index === 0))
    .join('');
  return `<div class="main-navigation__items">${navigationItemTemplate}</div>`;
};
