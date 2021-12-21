import AbstractView from './abstract-view';
const createFooterStatistics = (movie) => (
  `<p>${movie.length} movies inside</p>
  `
);
export default class FooterStatisticsView extends AbstractView{
  #movie = null;
  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createFooterStatistics(this.#movie);
  }
}
