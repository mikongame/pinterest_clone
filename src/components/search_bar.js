import searchIcon from '../assets/search.png';

export function createSearchBar(onSearch) {
  const form = document.createElement('form');
  form.classList.add('SearchBar');

  const button = document.createElement('button');
  button.type = 'submit';
  button.classList.add('SearchButton');

  const icon = document.createElement('img');
  icon.src = searchIcon;
  icon.alt = 'Buscar';
  icon.classList.add('SearchIcon');

  button.appendChild(icon);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Buscar';
  input.classList.add('SearchInput');

  form.append(button, input);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query !== '') {
      onSearch(query);
      input.value = '';
    }
  });

  return form;
}
