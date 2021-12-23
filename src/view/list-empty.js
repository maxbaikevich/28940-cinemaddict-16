import AbstractView from './abstract-view';
const listEmtyTemplate = () => (
  `<h2 class="films-list__title">There are no movies in our database</h2>
  `
);
export default class ListTitleEmpty extends AbstractView{
  get template() {
    return listEmtyTemplate();
  }
}
