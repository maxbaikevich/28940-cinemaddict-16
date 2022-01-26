import {renderElement, remove, RenderPosition, replace} from '../render.js';
import FilmCardView from '../view/film-card-view';
import FilmDetailsView from '../view/film-details-view';

const Mode = {
  CLOSE: 'CLOSE',
  OPENED: 'OPENED',
};
export default class MoviePresenter {
  #container = null;
  #changeData = null;
  #changeMode = null
  #film = {};
  #films = [];
  #popUp = null;
  #filmCard = null
  #mode = Mode.CLOSE;
  constructor(container, films, changeData, changeMode) {
    this.#container = container;
    this.#films = films;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(film, films) {
    this.#film = film;
    this.#films = films;

    const prevMovieCardView = this.#filmCard;
    const prevPopupView = this.#popUp;

    this.#filmCard = new FilmCardView(this.#film, this.#films);
    this.#popUp = new FilmDetailsView(this.#film, this.#films);
    this.#popUp.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popUp.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popUp.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popUp.setClickCloseHandler(this.#handlePopupCloseButtonClick);

    this.#filmCard.setClickPosterHandler(this.#handleViewClick);
    this.#filmCard.setClickTitleHandler(this.#handleViewClick);
    this.#filmCard.setClickCommentsHandler(this.#handleViewClick);
    this.#filmCard.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCard.setWatchedClickHandler(this.#handleWatchedClick);

    if (prevMovieCardView === null || prevPopupView === null) {
      this.#renderFilmCard(this.#container, this.#filmCard, this.#popUp);
      return;
    }
    if (this.#mode === Mode.CLOSE) {
      replace(this.#filmCard, prevMovieCardView);
    }
    if(this.#mode === Mode.OPENED) {
      replace(this.#popUp, prevPopupView);
      replace(this.#filmCard, prevMovieCardView);
    }
    remove(prevMovieCardView);
    remove(prevPopupView);
  }

  #renderFilmCard = (filmsListContainer, filmCard, popUp) => {
    const movieComponent = filmCard;
    const bodyElement = document.querySelector('body');

    renderElement(filmsListContainer, movieComponent, RenderPosition.BEFOREEND);
    movieComponent.setClickPosterHandler(()=> {
      this.#renderPopUp(bodyElement, popUp);
    });
    movieComponent.setClickTitleHandler(()=> {
      this.#renderPopUp(bodyElement, popUp);
    });
    movieComponent.setClickCommentsHandler(()=> {
      this.#renderPopUp(bodyElement, popUp);
    });
  };

  destroy() {
    remove(this.#filmCard);
    remove(this.#popUp);
  }

  resetView() {
    if (this.#mode === Mode.OPENED) {
      this.#clocePopUp();
    }
  }

  #clocePopUp = () => {
    this.#mode = Mode.CLOSE;
    remove(this.#popUp);
    document.body.classList.remove('hide-overflow');
  }

  #setPopupEventListeners = () => {
    this.#popUp.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popUp.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popUp.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popUp.setCloseButtonClickHandler(this.#handlePopupCloseButtonClick);
  }

  #handleViewClick = () => {
    if (this.#mode === Mode.OPENED) {
      return;
    }
    this.#changeMode();
    this.#mode = Mode.OPENED;
    this.#setPopupEventListeners();
    document.addEventListener('keydown', this.#onEscKeyDown);
    document.body.classList.add('hide-overflow');
    renderElement(document.body, this.#popUp, RenderPosition.BEFOREEND);
  }

  #renderPopUp = () => {
    if (this.#mode === Mode.OPENED) {
      return;
    }
    this.#changeMode();
    this.#mode = Mode.OPENED;
    const bodyElement = document.querySelector('body');
    bodyElement.classList.add('hide-overflow');
    bodyElement.appendChild(this.#popUp.element);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#popUp.setClickCloseHandler(()=> this.#clocePopUp());
    this.#mode = Mode.OPENED;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#clocePopUp();
    }
  };

  #handlePopupCloseButtonClick = () => {
    this.#clocePopUp();
  }

  #handleWatchlistClick = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData({...this.#film });
  }

  #handleFavoriteClick = () => {
    this.#film.userDetails.favorite =!this.#film.userDetails.favorite;
    this.#changeData({...this.#film});
  }

  #handleWatchedClick = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData({...this.#film});
  }
}
