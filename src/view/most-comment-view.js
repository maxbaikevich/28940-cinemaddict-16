import AbstractView from './abstract-view';
const createMostCommentTemplate = () =>(
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>`
);
export default class MostComment extends AbstractView{
  get template() {
    return createMostCommentTemplate();
  }

  get container() {
    return this.element.querySelector('.films-list__container');
  }

  isEmptyContainer() {
    return this.element.querySelector('.films-list__container').childElementCount === 0;
  }
}
