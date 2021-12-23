
import AvatarmenuVIew from './view/avatar-view';
import NavigationView from './view/navigation-view';
import NavigationItemsView from './view/navigation-items-view';
import StatsView from './view/status-view';
import SortView from './view/sort-view.js';
import {renderElement, remove, RenderPosition} from './render.js';
import FilmView from './view/films-view';
import FilmListView from './view/films-list-view';
import FilmCardView from './view/film-card-view';
import BtnChowMoreView from './view/btn-show-more-view';
import TopRatedView from './view/top-rated-view';
import MostComment from './view/most-comment-view';
import FooterStatisticsView  from './view/footer-statistics-view';
import FilmDetailsView from './view/film-details-view';
import DetailsControlsView from './view/film-details-controls-view';
import DetailsTopContent from './view/film-details-content-view';
import FilmDetailsBottomView from './view/film-details-bottom-view';
import FilmDetailsCommentView from './view/film-details-comment-view';
import FilmDetailsCommentListView from './view/film-details-comments-list-view';
import NewCommentView from './view/film-details-new-comment-view';
import ControlBtnView from './view/film-details-content-btn-view';
import CommentEmojiView from './view/film-details-comment-emoji-view';
import ListTitleEmpty from './view/list-empty';
import {generateMovie} from './mock/movie';
import {createComments} from './utils';
import {generateFilter} from './utils';
const MOVIE_COUNT = 20;
const MOVIE_COUNT_PER_STEP = 5;
const movie = Array.from({length: MOVIE_COUNT}, generateMovie);
const comments = createComments(movie);
const commentsList = (movieData, commentsData) => {
  const res = [];
  movieData.comments.forEach((element) => {
    res.push(commentsData.find((comment) => comment.id === element));
  });
  return res;
};
const detailsControlButton = [
  {styleClass:'film-details__control-button--watchlist',title: 'Add to watchlist', id:'watchlist', name: 'watchlist'},
  {styleClass:'film-details__control-button--watched', title:'Already watched', id:'watched', name: 'watched'},
  {styleClass:'film-details__control-button--favorite', title:'Add to favorites', id:'favorite', name: 'favorite'}
];
const commentEmoji = ['smile','sleeping','puke','angry'];
const renderPopUp = (bodyElement, topContent, moviedata) => {
  const popUp = new FilmDetailsView();
  bodyElement.classList.add('hide-overflow');
  bodyElement.appendChild(popUp.element);
  renderElement(popUp, topContent, RenderPosition.BEFOREEND);
  const filmDetailsTopContainer = popUp.element.querySelector('.film-details__top-container');
  renderElement(filmDetailsTopContainer, new DetailsControlsView(), RenderPosition.BEFOREEND);
  const filmDetailsControls = popUp.element.querySelector('.film-details__controls');
  for(let i = 0; i < detailsControlButton.length; i++) {
    renderElement(filmDetailsControls, new ControlBtnView(detailsControlButton[i], moviedata.userDetails), RenderPosition.BEFOREEND);
  }
  const commentListData = commentsList(moviedata,comments);
  renderElement(popUp, new FilmDetailsBottomView(commentListData), RenderPosition.BEFOREEND);
  const commentWrap = popUp.element.querySelector('.film-details__comments-wrap');
  renderElement(commentWrap, new FilmDetailsCommentListView(), RenderPosition.BEFOREEND);
  const commentList = popUp.element.querySelector('.film-details__comments-list');
  for(let i = 0; i < commentListData.length; i++) {
    renderElement(commentList, new FilmDetailsCommentView(commentListData[i]), RenderPosition.BEFOREEND);
  }
  renderElement(commentWrap, new NewCommentView(), RenderPosition.BEFOREEND);
  const filmDetailsEmojiList = document.querySelector('.film-details__emoji-list');
  for(let i = 0; i < commentEmoji.length; i++) {
    renderElement(filmDetailsEmojiList, new CommentEmojiView(commentEmoji[i]), RenderPosition.BEFOREEND);
  }
  const clocePopUp = () =>{
    bodyElement.removeChild(popUp.element);
    remove(topContent);
    bodyElement.classList.remove('hide-overflow');
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      clocePopUp();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  document.addEventListener('keydown', onEscKeyDown);
  topContent.setClickCloseHandler(()=> clocePopUp());
};
const renderFilmCard = (filmsListContainer, movieData) => {
  const movieComponent = new FilmCardView(movieData);
  const bodyElement = document.querySelector('body');

  const topContent = new DetailsTopContent(movieData);
  renderElement(filmsListContainer, movieComponent, RenderPosition.BEFOREEND);
  movieComponent.setClickPosterHandler(()=> {
    renderPopUp(bodyElement, topContent, movieData);
  });
  movieComponent.setClickTitleHandler(()=> {
    renderPopUp(bodyElement, topContent, movieData);
  });
  movieComponent.setClickCommentsHandler(()=> {
    renderPopUp(bodyElement, topContent, movieData);
  });
};
const filterDate = generateFilter(movie);
const siteHeaderElement = document.querySelector('.header');
const btnChowMore = new BtnChowMoreView;
renderElement(siteHeaderElement, new AvatarmenuVIew(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector('.main');
renderElement(siteMainElement, new NavigationView(), RenderPosition.BEFOREEND);
const navigationBlock = siteMainElement.querySelector('.main-navigation');
renderElement(navigationBlock, new NavigationItemsView(filterDate), RenderPosition.BEFOREEND);
renderElement(navigationBlock, new StatsView(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, movie.length ? new SortView() : new ListTitleEmpty(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmView(), RenderPosition.BEFOREEND);
const siteFilmslist = siteMainElement.querySelector('.films-list');
renderElement(siteFilmslist, new FilmListView(), RenderPosition.BEFOREEND);
const filmsListContainerWrap = siteFilmslist.querySelector('.films-list__container');
for(let i = 0; i < Math.min(movie.length, MOVIE_COUNT_PER_STEP); i++) {
  renderFilmCard(filmsListContainerWrap, movie[i]);
}
if(movie.length > MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;
  renderElement(siteFilmslist, btnChowMore, RenderPosition.BEFOREEND);

  btnChowMore.setClickHandler(() => {
    movie
      .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movieItem) => renderFilmCard(filmsListContainerWrap, movieItem));
    renderedMovieCount += MOVIE_COUNT_PER_STEP;
    if(renderedMovieCount >= movie.length) {
      remove(btnChowMore);
    }
  });
}

const siteFilms = siteMainElement.querySelector('.films');
if(movie.length) {
  renderElement(siteFilms, new TopRatedView(), RenderPosition.BEFOREEND);
  renderElement(siteFilms, new MostComment(), RenderPosition.BEFOREEND);
}

const filmsListExtra = siteFilms.querySelectorAll('.films-list--extra');
for(const element of filmsListExtra ) {
  const extraContainer = element.querySelector('.films-list__container');
  for(let i = 0; i < 2; i++) {
    renderFilmCard(extraContainer, movie[i]);
  }
}
const footerStatistics = document.querySelector('.footer__statistics');
renderElement(footerStatistics, new FooterStatisticsView(movie), RenderPosition.BEFOREEND);
