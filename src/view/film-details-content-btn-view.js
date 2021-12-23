import AbstractView from './abstract-view';
const createControlBtnTemplate = (detailsControl, userDetails) => {
  const adapterDate  = (details) => ({
    favorite:details.favorite,
    watched:details.alreadyWatched,
    watchlist:details.watchlist,
    watchingDate:details.watchingDate
  });
  let active = '';
  const date = adapterDate(userDetails);
  const {styleClass, title, id, name} = detailsControl;
  if(date[id]) {
    active = 'film-details__control-button--active';
  }
  return `<button type="button" class="film-details__control-button ${active} ${styleClass}" id="${id}" name="${name}">${title}</button>`;
};
export default class ControlBtnView extends AbstractView{
  #detailsControl = null;
  #userDetails = null;
  constructor(detailsControl, userDetails) {
    super();
    this.#detailsControl = detailsControl;
    this.#userDetails = userDetails;
  }

  get template() {
    return createControlBtnTemplate(this.#detailsControl, this.#userDetails);
  }
}
