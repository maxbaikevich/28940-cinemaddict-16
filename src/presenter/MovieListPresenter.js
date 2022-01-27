import SortView from '../view/sort-view.js';
import {renderElement, remove, RenderPosition, selectRatedFilms, selectCommentFilm} from '../render.js';
import {updateMovie} from '../utils';
import FilmView from '../view/films-view';
import MainContent from '../view/main-content-view';
import FilmListView from '../view/films-list-view';
import BtnChowMoreView from '../view/btn-show-more-view';
import TopRatedView from '../view/top-rated-view';
import MostComment from '../view/most-comment-view';
import ListTitleEmpty from '../view/list-empty';
import MoviePresenter from './MoviePresenter.js';
const MOVIE_COUNT_PER_STEP = 5;
const FILM_TOP = 2;


export default class MovieList {
  #container = null;
  #films = [];
  #renderedFilmCount = MOVIE_COUNT_PER_STEP;
  #sortView = new SortView();
  #FilmView = new FilmView();
  #MainContentFilm = new MainContent();
  #filmsListContainer = new FilmListView();
  #btnShowMoreView = new BtnChowMoreView();
  #topRatedView = new TopRatedView();
  #mostComment = new MostComment();
  #listTitleEmpty = new ListTitleEmpty();
  #filmCardPresenter = {};

  constructor(container) {
    this.#container = container;
  }

  init(films) {
    this.#films = films.slice();
    this.#renderFilmsBoard();
  }

  #renderFilmCard = (filmsListContainer, movieData, typePresenter) => {
    const filmCardPresenter = new MoviePresenter(filmsListContainer, this.#films, this.#handleMovieChange, this.#handleModeChange);
    filmCardPresenter.init(movieData, this.#films);
    typePresenter[movieData.id] = filmCardPresenter;
  };

  // #clearMovieList = () => {
  //   this.#filmCardPresenter.forEach((presenter) => presenter.destroy())
  //   this.#filmCardPresenter.clear();
  //   this.#renderedFilmCount = MOVIE_COUNT_PER_STEP;
  //   remove(this.#btnShowMoreView)
  // };

  #handleMovieChange = (updateFilm) => {
    this.#films = updateMovie(this.#films, updateFilm);
    this.#filmCardPresenter[updateFilm.id].init(updateFilm, this.#films);
  }

  #handleModeChange = () => {
    [
      ...Object.values(this.#filmCardPresenter),
    ]
      .forEach((presenter) => presenter.resetView());
  }

  #renderSort = () => {
    renderElement(this.#container, this.#sortView, RenderPosition.BEFOREEND);
  }

  #renderMainContentFilm = () => {
    renderElement(this.#container, this.#MainContentFilm, RenderPosition.BEFOREEND);
  }

  #renderSiteFilmslist = () => {
    renderElement(this.#MainContentFilm, this.#FilmView, RenderPosition.BEFOREEND);
  }

  #filmsListContainerWrap = () => {
    renderElement(this.#FilmView, this.#filmsListContainer, RenderPosition.BEFOREEND);
  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(this.#filmsListContainer.element, film, this.#filmCardPresenter));
  }

  #renderbtnShowMore = () => {
    renderElement(this.#FilmView, this.#btnShowMoreView, RenderPosition.BEFOREEND);
    this.#btnShowMoreView.setClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderNofilms = () => {
    renderElement(this.#container, this.#listTitleEmpty, RenderPosition.BEFOREEND);
  }

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + MOVIE_COUNT_PER_STEP);
    this.#renderedFilmCount += MOVIE_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#btnShowMoreView);
    }
  }

  #rendertopRatedViewBlock = (from, to) => {
    if (this.#topRatedView.isEmptyContainer()) {
      selectRatedFilms(this.#films)
        .slice(from, to)
        .forEach((film) => this.#renderFilmCard( this.#topRatedView.container, film, this.#filmCardPresenter));
    }
  }

  #renderMostCommentBlock = (from, to) => {
    if(this.#mostComment.isEmptyContainer()) {
      selectCommentFilm(this.#films)
        .slice(from, to)
        .forEach((film) => this.#renderFilmCard(this.#mostComment.container, film, this.#filmCardPresenter));
    }
  }

  #renderFilmListExtra = () => {
    this.#rendertopRatedViewBlock(0, FILM_TOP);
    this.#renderMostCommentBlock(0, FILM_TOP);
  }

  #renderFilmsBoard = () => {
    if (this.#films.length === 0) {
      this.#renderNofilms();
      return;
    }

    this.#renderSort();
    this.#renderMainContentFilm();
    this.#renderSiteFilmslist();
    this.#filmsListContainerWrap();
    this.#renderFilms(0, MOVIE_COUNT_PER_STEP);
    this.#renderbtnShowMore();
    this.#renderFilmListExtra();
    renderElement( this.#MainContentFilm,this.#topRatedView, RenderPosition.BEFOREEND);
    renderElement( this.#MainContentFilm,this.#mostComment, RenderPosition.BEFOREEND);
  }
}
