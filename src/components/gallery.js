import { createImageCard } from './image_card.js';

export function createGallery() {
  const container = document.createElement('section');
  container.classList.add('Gallery');

  return {
    getElement: () => container,
    render: (images) => {
      container.innerHTML = '';

      if (!Array.isArray(images) || images.length === 0) {
        const message = document.createElement('p');
        message.classList.add('EmptyMessage');
        message.textContent = 'No hay imágenes para mostrar.';
        container.appendChild(message);
        return;
      }

      images.forEach(image => {
        const card = createImageCard(image);
        container.appendChild(card);
      });
    }
  };
}
