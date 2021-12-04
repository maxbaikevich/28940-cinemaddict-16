import { createAvatarTemplate } from './view/avatar-view';
import { createNavigationTemplate } from './view/navigation-view';
import { createNavigationItemsTemplate } from './view/navigation-items-view';
import { createStatusTemplate } from './view/status-view';
import {createSortTemplate }from './view/sort-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {createFilmTemplate} from './view/films-view';
import {createFilmListTemplate} from './view/films-list-view';
import {createFilmCardTemplate} from './view/film-card-view';
import {createBtnChowMoreTemplate} from './view/btn-show-more-view';
import {createTopRatedTemplate} from './view/top-rated-view';
import {createMostCommentTemplate} from './view/most-comment-view';
import {createFooterStatistics} from './view/footer-statistics-view';
import {createFilmDetailsTemplate} from './view/film-details-view';
import {createDetailsControlsTemplate} from './view/film-details-controls-views';
import {createDetailsTopContentTemplate} from './view/film-details-content-view';
import {createFilmDetailsBottomTemplate} from './view/film-details-bottom-view';
import {createFilmDetailsCommentTemplate} from './view/film-details-comment-view';
import {createFilmDetailsCommentList} from './view/film-details-comments-list-view';
import {createNewCommentTemplate} from './view/film-details-new-comment-view';
import {createControlBtnTemplate} from './view/film-details-content-btn-view';
import {createCommentEmojiTemplate} from './view/film-details-comment-emoji-view';
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
const filterDate = generateFilter(movie);
const detailsControlButton = [
  {styleClass:'film-details__control-button--watchlist',title: 'Add to watchlist', id:'watchlist', name: 'watchlist'},
  {styleClass:'film-details__control-button--watched', title:'Already watched', id:'watched', name: 'watched'},
  {styleClass:'film-details__control-button--favorite', title:'Add to favorites', id:'favorite', name: 'favorite'}
];
const commentEmoji = ['smile','sleeping','puke','angry'];
const siteHeaderElement = document.querySelector('.header');
renderTemplate(siteHeaderElement, createAvatarTemplate(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector('.main');
renderTemplate(siteMainElement, createNavigationTemplate(), RenderPosition.BEFOREEND);
const navigationBlock = siteMainElement.querySelector('.main-navigation');
renderTemplate(navigationBlock, createNavigationItemsTemplate(filterDate), RenderPosition.BEFOREEND);
renderTemplate(navigationBlock, createStatusTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmTemplate(), RenderPosition.BEFOREEND);
const siteFilmslist = siteMainElement.querySelector('.films-list');
renderTemplate(siteFilmslist, createFilmListTemplate(), RenderPosition.BEFOREEND);
const filmsListContainer = siteFilmslist.querySelector('.films-list__container');
for(let i = 0; i < Math.min(movie.length, MOVIE_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(movie[i]), RenderPosition.BEFOREEND);
}
if(movie.length > MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;
  renderTemplate(siteFilmslist, createBtnChowMoreTemplate(), RenderPosition.BEFOREEND);
  const loadMoreButton = siteFilmslist.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movie
      .slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movieItem) => renderTemplate(filmsListContainer, createFilmCardTemplate(movieItem), RenderPosition.BEFOREEND));
    renderedMovieCount += MOVIE_COUNT_PER_STEP;
    if(renderedMovieCount >= movie.length) {
      loadMoreButton.remove();
    }
  });
}

const siteFilms = siteMainElement.querySelector('.films');
renderTemplate(siteFilms, createTopRatedTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilms, createMostCommentTemplate(), RenderPosition.BEFOREEND);
const filmsListExtra = siteFilms.querySelectorAll('.films-list--extra');

for(const element of filmsListExtra ) {
  const extraContainer = element.querySelector('.films-list__container');
  for(let i = 0; i < 2; i++) {
    renderTemplate(extraContainer, createFilmCardTemplate(movie[i]), RenderPosition.BEFOREEND);
  }
}
const footerStatistics = document.querySelector('.footer__statistics');
renderTemplate(footerStatistics, createFooterStatistics(movie), RenderPosition.BEFOREEND);
const bodyElement = document.querySelector('body');
renderTemplate(bodyElement, createFilmDetailsTemplate(), RenderPosition.BEFOREEND);
const filmDetails = document.querySelector('.film-details');
renderTemplate(filmDetails, createDetailsTopContentTemplate(movie[0]), RenderPosition.BEFOREEND);
const filmDetailsTopContainer = filmDetails.querySelector('.film-details__top-container');
renderTemplate(filmDetailsTopContainer, createDetailsControlsTemplate(), RenderPosition.BEFOREEND);
const filmDetailsControls = document.querySelector('.film-details__controls');
for(let i = 0; i < detailsControlButton.length; i++) {
  renderTemplate(filmDetailsControls, createControlBtnTemplate(detailsControlButton[i], movie[0].userDetails), RenderPosition.BEFOREEND);
}
const commentListData = commentsList(movie[0], comments);
renderTemplate(filmDetails, createFilmDetailsBottomTemplate(commentListData), RenderPosition.BEFOREEND);
const commentWrap = filmDetails.querySelector('.film-details__comments-wrap');
renderTemplate(commentWrap, createFilmDetailsCommentList(), RenderPosition.BEFOREEND);
const commentList = filmDetails.querySelector('.film-details__comments-list');
for(let i = 0; i < commentListData.length; i++) {
  renderTemplate(commentList, createFilmDetailsCommentTemplate(commentListData[i]), RenderPosition.BEFOREEND);
}
renderTemplate(commentWrap, createNewCommentTemplate(), RenderPosition.BEFOREEND);
const filmDetailsEmojiList = document.querySelector('.film-details__emoji-list');
for(let i = 0; i < commentEmoji.length; i++) {
  renderTemplate(filmDetailsEmojiList, createCommentEmojiTemplate(commentEmoji[i]), RenderPosition.BEFOREEND);
}
