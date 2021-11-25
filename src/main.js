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


const siteHeaderElement = document.querySelector('.header');
renderTemplate(siteHeaderElement, createAvatarTemplate(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector('.main');
renderTemplate(siteMainElement, createNavigationTemplate(), RenderPosition.BEFOREEND);
const navigationBlock = siteMainElement.querySelector('.main-navigation');
renderTemplate(navigationBlock, createNavigationItemsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(navigationBlock, createStatusTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmTemplate(), RenderPosition.BEFOREEND);
const siteFilmslist = siteMainElement.querySelector('.films-list');
renderTemplate(siteFilmslist, createFilmListTemplate(), RenderPosition.BEFOREEND);
const filmsListContainer = siteFilmslist.querySelector('.films-list__container');
for(let i = 0; i < 5; i++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}
renderTemplate(siteFilmslist, createBtnChowMoreTemplate(), RenderPosition.BEFOREEND);
const siteFilms = siteMainElement.querySelector('.films');
renderTemplate(siteFilms, createTopRatedTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilms, createMostCommentTemplate(), RenderPosition.BEFOREEND);
const filmsListExtra = siteFilms.querySelectorAll('.films-list--extra');

for(const element of filmsListExtra ) {
  const extraContainer = element.querySelector('.films-list__container');
  for(let i = 0; i < 2; i++) {
    renderTemplate(extraContainer, createFilmCardTemplate(), RenderPosition.BEFOREEND);
  }
}
const footerStatistics = document.querySelector('.footer__statistics');
renderTemplate(footerStatistics, createFooterStatistics(), RenderPosition.BEFOREEND);
const bodyElement = document.querySelector('body');
renderTemplate(bodyElement, createFilmDetailsTemplate(), RenderPosition.BEFOREEND);
const filmDetails = document.querySelector('.film-details');
renderTemplate(filmDetails, createDetailsTopContentTemplate(), RenderPosition.BEFOREEND);
const filmDetailsTopContainer = filmDetails.querySelector('.film-details__top-container');
renderTemplate(filmDetailsTopContainer, createDetailsControlsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filmDetails, createFilmDetailsBottomTemplate(), RenderPosition.BEFOREEND);
const commentWrap = filmDetails.querySelector('.film-details__comments-wrap');
renderTemplate(commentWrap, createFilmDetailsCommentList(), RenderPosition.BEFOREEND);
const commentList = filmDetails.querySelector('.film-details__comments-list');
for(let i = 0; i < 4; i++) {
  renderTemplate(commentList, createFilmDetailsCommentTemplate(), RenderPosition.BEFOREEND);
}
renderTemplate(commentWrap, createNewCommentTemplate(), RenderPosition.BEFOREEND);
