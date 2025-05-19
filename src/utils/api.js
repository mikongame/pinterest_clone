const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const BASE_URL = 'https://api.unsplash.com';

export async function searchImages(query) {
  const url = `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener imágenes');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error en la búsqueda:', error.message);
    throw error;
  }
}