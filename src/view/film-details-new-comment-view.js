import AbstractView from './abstract-view';
const createNewCommentTemplate = () => (
  `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label"></div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
    </div>
  </div>`
);
export default class NewCommentView extends AbstractView {
  get template() {
    return createNewCommentTemplate();
  }
}
