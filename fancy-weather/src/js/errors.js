const popup = document.querySelector('.popup');

export function showErrorPopup(message) {
  const errorText = document.querySelector('.popup__error-text');
  errorText.textContent = message;

  popup.classList.add('popup--visible');
}

export function closeErrorPopup() {
  popup.classList.remove('popup--visible');
}
