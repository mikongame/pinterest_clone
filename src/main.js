import './style/style.css';
import './style/responsive.css';

import { createHeader } from './components/header/header.js';
import { createErrorMessage } from './components/error/error_message.js';
import { createGallery } from './components/gallery/gallery.js';
import { searchImages } from './utils/api.js';

let gallery;
let errorMessage;

const FIRST_QUERY_KEY = 'first_query';

if (localStorage.getItem(FIRST_QUERY_KEY) === 'gatos') {
  localStorage.removeItem(FIRST_QUERY_KEY);
}

async function renderImages(query) {
  errorMessage.hide();

  try {
    const images = await searchImages(query);

    if (images.length === 0) {
      errorMessage.show(`No se encontraron imágenes con "${query}". Mostrando "gatos" 🐱`);
      const fallbackImages = await searchImages('gatos');
      gallery.render(fallbackImages);
    } else {
      gallery.render(images);
    }
  } catch (error) {
    errorMessage.show('Hubo un error al obtener imágenes. Intenta de nuevo más tarde.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const header = createHeader((query) => {
    const alreadyStored = localStorage.getItem(FIRST_QUERY_KEY);

    if (!alreadyStored && query !== 'gatos') {
      localStorage.setItem(FIRST_QUERY_KEY, query);
    }

    renderImages(query);
  }, () => {
    const savedQuery = localStorage.getItem(FIRST_QUERY_KEY);
    renderImages(savedQuery || 'gatos');
  });

  app.appendChild(header);

  errorMessage = createErrorMessage();
  app.appendChild(errorMessage.element);

  gallery = createGallery();
  app.appendChild(gallery.getElement());

  renderImages('gatos');
});
