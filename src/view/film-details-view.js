import AbstractView from './abstract-view';
import dayjs from 'dayjs';
import {timeStempDuration, createComments} from '../utils';
const createGenre = (genre) => {
  const res = genre.map((el)=> (`<span class="film-details__genre">${el}</span>`));
  return res.join(' ');
};
const detailsControlButton = [
  {styleClass:'film-details__control-button--watchlist',title: 'Add to watchlist', id:'watchlist', name: 'watchlist'},
  {styleClass:'film-details__control-button--watched', title:'Already watched', id:'watched', name: 'watched'},
  {styleClass:'film-details__control-button--favorite', title:'Add to favorites', id:'favorite', name: 'favorite'}
];
const commentEmoji = ['smile','sleeping','puke','angry'];

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

const createCommentEmojiTemplate = (emoji) => (
  ` <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="${emoji}">
    </label>`
);

const createFilmDetailsCommentTemplate = (commentData) => {
  const {emotion, comment, author, date} = commentData;
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(date).format('YYYY/DD/MM HH:mm')}</span>
        <button class="film-details__comment-delete">Delete</button>
     </p>
    </div>
  </li>`;
};

const renderBtn = (movie) => {
  let btnTemplateData = '';
  for(let i = 0; i < detailsControlButton.length; i++) {
    btnTemplateData += createControlBtnTemplate(detailsControlButton[i], movie.userDetails);
  }
  return btnTemplateData;
};

const commentsList = (movieData, commentsData, length) => {
  const res = [];
  movieData.comments.forEach((element) => {
    res.push(commentsData.find((comment) => comment.id === element));
  });
  return length ? res.length : res;
};

const renderFilmDetailsComment = (commentListData) => {
  let filmDetailsComment = '';
  for(let i = 0; i < commentListData.length; i++) {
    filmDetailsComment += createFilmDetailsCommentTemplate(commentListData[i]);
  }
  return filmDetailsComment;
};

const renderCommentEmoji = (commentEmojiData) => {
  let emojiListTemplate = '';
  for(let i = 0; i < commentEmojiData.length; i++) {
    emojiListTemplate += createCommentEmojiTemplate(commentEmojiData[i]);
  }
  return emojiListTemplate;
};

const createFilmDetailsTemplate = (movie, movies, emoji) => {
  const  {title, poster, ageRating, director, release, actors, writers, totalRating, runtime, description, genre, alternativeTitle} = movie.filmInfo;
  const runtimeDate = timeStempDuration(runtime);
  return`<section class="film-details">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(release.date).format('d MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtimeDate.hours}h ${runtimeDate.minutes}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${createGenre(genre)}
            </tr>
          </table>
          <p class="film-details__film-description">${description}</p>
        </div>
      </div>
      <section class="film-details__controls">
      ${renderBtn(movie)}
      </section>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsList(movie,createComments(movies), true)}</span></h3>
        <ul class="film-details__comments-list">
          ${renderFilmDetailsComment(commentsList(movie,createComments(movies), false))}
        </ul
      </section>
      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label"></div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
        <div class="film-details__emoji-list">
          ${renderCommentEmoji(emoji)}
        </div>
      </div
    </div>
</section>`;
};
export default class FilmDetailsView extends AbstractView {
  #movie = null;
  #movies = null;
  #commentEmoji = commentEmoji
  constructor(movie, movies) {
    super();
    this.#movie = movie;
    this.#movies = movies;
  }

  get template() {
    return createFilmDetailsTemplate(this.#movie, this.#movies, this.#commentEmoji);
  }

  setClickCloseHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.clickWatchlist = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  }

  setCloseButtonClickHandler = (callback) => {
    this._callback.clickCloseButton = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseButtonClickHandler);
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

  #popupCloseButtonClickHandler = () => {
    this._callback.clickCloseButton();
  }
}
