import { createElement } from '../render';
const createCommentEmojiTemplate = (emoji) => (
  ` <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="${emoji}">
    </label>`
);
export default class CommentEmojiView {
  #element = null;
  #emoji = null;
  constructor(emoji) {
    this.#emoji = emoji;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createCommentEmojiTemplate(this.#emoji);
  }

  removeElement() {
    this.#element = null;
  }
}
