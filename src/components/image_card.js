import cameraIcon from '../assets/camera.png';
import heartIcon from '../assets/like.png';
import shareIcon from '../assets/share.png';

export function createImageCard(image) {
  const card = document.createElement('li');
  card.classList.add('ImageCard');

  const wrapper = document.createElement('div');
  wrapper.classList.add('ImageWrapper');

  const img = document.createElement('img');
  img.src = image.urls.regular;
  img.alt = image.alt_description || 'Imagen de Unsplash';
  img.classList.add('Image');

  const overlay = document.createElement('div');
  overlay.classList.add('ImageOverlay');

  const overlayTop = document.createElement('div');
  overlayTop.classList.add('OverlayTop');

  const cameraBox = document.createElement('div');
  cameraBox.classList.add('OverlayIcon');
  const cameraImg = document.createElement('img');
  cameraImg.src = cameraIcon;
  cameraImg.alt = 'Camera';
  const photoCount = document.createElement('span');
  photoCount.textContent = `+${image.user.total_photos || 0}`;
  cameraBox.append(cameraImg, photoCount);

  const heartBox = document.createElement('div');
  heartBox.classList.add('OverlayIcon');
  const heartImg = document.createElement('img');
  heartImg.src = heartIcon;
  heartImg.alt = 'Likes';
  const likeCount = document.createElement('span');
  likeCount.textContent = image.likes || 0;
  heartBox.append(heartImg, likeCount);

  overlayTop.append(cameraBox, heartBox);

  const visitBtn = document.createElement('button');
  visitBtn.classList.add('VisitButton');
  visitBtn.textContent = 'Visitar';

  overlay.append(overlayTop, visitBtn);
  wrapper.append(img, overlay);
  card.appendChild(wrapper);

  const authorInfo = document.createElement('div');
  authorInfo.classList.add('AuthorInfo');

  const vibrantColors = [
  '#FF4081', '#E91E63', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
  '#009688', '#4CAF50', '#8BC34A', '#FFC107',
  '#FF9800', '#FF5722', '#795548'
];

// Opcional: selecciona uno en base al ID del usuario (para consistencia)
const colorIndex = image.user.id
  .split('')
  .reduce((acc, char) => acc + char.charCodeAt(0), 0) % vibrantColors.length;

const selectedColor = vibrantColors[colorIndex];

  const avatar = document.createElement('img');
  avatar.src = image.user.profile_image.medium;
  avatar.alt = image.user.name;
  avatar.classList.add('AuthorAvatar');
  avatar.style.border = `3px solid ${selectedColor}`;

  const name = document.createElement('p');
  name.classList.add('AuthorName');
  name.textContent = image.user.name;

  const date = document.createElement('p');
  date.classList.add('AuthorDate');
  const share = document.createElement('img');
  share.src = shareIcon;
  share.alt = 'Share icon';
  const formatted = new Date(image.created_at).toLocaleDateString();
  date.append(share, document.createTextNode(formatted));

  authorInfo.append(avatar, name, date);
  card.appendChild(authorInfo);

  return card;
}
