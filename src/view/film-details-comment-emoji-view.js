import AbstractView from './abstract-view';
const createCommentEmojiTemplate = (emoji) => (
  ` <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="${emoji}">
    </label>`
);
export default class CommentEmojiView extends AbstractView {
  #emoji = null;
  constructor(emoji) {
    super();
    this.#emoji = emoji;
  }

  get template() {
    return createCommentEmojiTemplate(this.#emoji);
  }
}
