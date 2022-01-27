import AvatarmenuVIew from './view/avatar-view';
import NavigationView from './view/navigation-view';
import NavigationItemsView from './view/navigation-items-view';
import StatsView from './view/status-view';
import {renderElement, RenderPosition} from './render.js';
import FilmView from './view/films-view';
import MainContent from './view/main-content-view';
import FilmListView from './view/films-list-view';
import FooterStatisticsView  from './view/footer-statistics-view';
import {generateMovie} from './mock/movie';
import {generateFilter} from './utils';
import MovieListPresenter from './presenter/MovieListPresenter';
const MOVIE_COUNT = 20;
const movie = Array.from({length: MOVIE_COUNT}, generateMovie);
const filterDate = generateFilter(movie);
const siteHeaderElement = document.querySelector('.header');
renderElement(siteHeaderElement, new AvatarmenuVIew(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector('.main');
const navigationBlock = new NavigationView();
const mainContentFilm = new MainContent();
const siteFilmslist = new FilmView();
renderElement(siteMainElement, navigationBlock, RenderPosition.BEFOREEND);
renderElement(navigationBlock, new NavigationItemsView(filterDate), RenderPosition.BEFOREEND);
renderElement(navigationBlock, new StatsView(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, mainContentFilm.element, RenderPosition.BEFOREEND);

const filmsListContainerWrap = new FilmListView();
renderElement(siteFilmslist, filmsListContainerWrap.element, RenderPosition.BEFOREEND);

const footerStatistics = document.querySelector('.footer__statistics');
renderElement(footerStatistics, new FooterStatisticsView(movie), RenderPosition.BEFOREEND);
const moviePresentor = new MovieListPresenter(siteMainElement);
moviePresentor.init(movie);

