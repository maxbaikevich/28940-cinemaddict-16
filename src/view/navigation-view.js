
import AbstractView from './abstract-view';
const createNavigationTemplate = () => (
  `<nav class="main-navigation"></nav>
  `
);
export default class NavigationView extends AbstractView {
  get template() {
    return createNavigationTemplate();
  }
}
