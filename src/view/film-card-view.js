import AbstractView from './abstract-view';
import dayjs from 'dayjs';
import {timeStempDuration} from '../utils';
const LENGTH_DESCRIPTION = 140;

const createFilmCardTemplate = (movie) => {
  const  {title, poster,totalRating, runtime, description, genre} = movie.filmInfo;
  const  {alreadyWatched, favorite, watchlist} = movie.userDetails;
  const duration = timeStempDuration(runtime);
  const descriptionFormat = (descriptionText) => (
    descriptionText.length > LENGTH_DESCRIPTION ? `${descriptionText.substring(0, 140)}...` : descriptionText
  );
  return`<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dayjs(movie.filmInfo.release.date).format('YYYY')}</span>
        <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionFormat(description)}</p>
      <span class="film-card__comments">${movie.comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}"" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
export default class FilmCardView extends AbstractView{
  #movie = null;
  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createFilmCardTemplate(this.#movie);
  }

  setClickPosterHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#clickHandler);
  }

  setClickTitleHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__title').addEventListener('click',this.#clickHandler);
  }

  setClickCommentsHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__comments').addEventListener('click', this.#clickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  }

  #watchlistClickHandler = () => {
    this._callback.clickWatchlist();
  }

  #favoriteClickHandler = () => {
    this._callback.clickFavorite();
  }

  #watchedClickHandler = () => {
    this._callback.clickWatched();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
