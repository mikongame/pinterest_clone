import './error_message.css';

export function createErrorMessage() {
  const container = document.createElement('div');
  container.classList.add('ErrorMessage');
  container.style.display = 'none';

  const message = document.createElement('p');
  message.classList.add('ErrorText');
  container.appendChild(message);

  return {
    element: container,
    show: (text) => {
      message.textContent = text;
      container.style.display = 'block';
    },
    hide: () => {
      container.style.display = 'none';
    }
  };
}
