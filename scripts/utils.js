//Открытие попапа
export function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

//Закрытие попапа
export function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

//Функция закрытия попапа на esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
