import AbstractView from './abstract-view';
import dayjs from 'dayjs';
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
export default class FilmDetailsCommentView extends AbstractView {
  #commentData = null;
  constructor(commentData) {
    super();
    this.#commentData = commentData;
  }

  get template() {
    return createFilmDetailsCommentTemplate(this.#commentData);
  }
}
