import { createAvatarTemplate } from './view/avatar-view';
import { createNavigationTemplate } from './view/navigation-view';
import { createNavigationItemsTemplate } from './view/navigation-items-view';
import { createStatusTemplate } from './view/status-view';
import {renderTemplate, RenderPosition} from './render.js';


const siteHeaderElement = document.querySelector('.header');
renderTemplate(siteHeaderElement, createAvatarTemplate(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector('.main');
renderTemplate(siteMainElement, createNavigationTemplate(), RenderPosition.BEFOREEND);
const navigationBlock = siteMainElement.querySelector('.main-navigation');
renderTemplate(navigationBlock, createNavigationItemsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(navigationBlock, createStatusTemplate(), RenderPosition.BEFOREEND);
