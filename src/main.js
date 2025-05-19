import './style/style.css';
import './style/header.css';
import './style/search_bar.css';
import './style/gallery.css';
import './style/image_card.css';
import './style/error_message.css';
import './style/responsive.css';

import { createHeader } from './components/header.js';
import { createGallery } from './components/gallery.js';
import { createErrorMessage } from './components/error_message.js';
import { searchImages } from './utils/api.js';

let gallery;
let errorMessage;

async function renderImages(query) {
  errorMessage.hide(); // Ocultar errores anteriores

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

  // Header
  const header = createHeader(renderImages, () => renderImages('gatos'));
  app.appendChild(header);

  // Galería
  gallery = createGallery();
  app.appendChild(gallery.getElement());

  // Mensajes de error
  errorMessage = createErrorMessage();
  app.appendChild(errorMessage.element);

  // Búsqueda inicial
  renderImages('gatos');
});
