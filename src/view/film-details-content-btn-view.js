export const createControlBtnTemplate = (detailsControl, active) => {
  const {styleClass, title, id, name} = detailsControl;
  return `<button type="button" class="film-details__control-button ${active} ${styleClass}" id="${id}" name="${name}">${title}</button>`;
};
