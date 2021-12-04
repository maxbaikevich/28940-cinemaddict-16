export const createControlBtnTemplate = (detailsControl, userDetails) => {
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
