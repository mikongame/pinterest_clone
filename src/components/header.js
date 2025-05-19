import { createSearchBar } from './search_bar.js';
import logoSrc from '../assets/logopinteres.png';
import bellIcon from '../assets/bell.png';
import commentIcon from '../assets/comment.png';

export function createHeader(onSearch, onLogoClick) {
  const header = document.createElement('header');
  header.classList.add('Header');

  const logo = document.createElement('img');
  logo.src = logoSrc;
  logo.alt = 'Pinterest Logo';
  logo.classList.add('Logo');
  logo.addEventListener('click', () => {
    if (typeof onLogoClick === 'function') onLogoClick();
  });

  const nav = document.createElement('nav');
  nav.classList.add('NavButtons');

  const navItems = ['Inicio', 'Explorar', 'Crear'];
  const activePage = 'Inicio';

  navItems.forEach((text) => {
    const button = document.createElement('div');
    button.classList.add('NavButton');
    if (text === activePage) button.classList.add('Filled');
    button.textContent = text;
    nav.appendChild(button);
  });

  const searchContainer = document.createElement('div');
  searchContainer.classList.add('SearchContainer');
  const searchBar = createSearchBar(onSearch);
  searchContainer.appendChild(searchBar);

  const bell = document.createElement('img');
  bell.src = bellIcon;
  bell.alt = 'Notificaciones';
  bell.classList.add('Icon', 'BellIcon');

  const comment = document.createElement('img');
  comment.src = commentIcon;
  comment.alt = 'Mensajes';
  comment.classList.add('Icon', 'CommentIcon');

  const profile = document.createElement('div');
  profile.classList.add('Profile');
  profile.textContent = 'M';

  header.append(logo, nav, searchContainer, bell, comment, profile);
  return header;
}
