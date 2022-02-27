export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Записываем объект в переменную
export const selectors = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}

//Модалки
export const popupProfileModal = document.querySelector('.popup_type_edit');
export const popupElementModal = document.querySelector('.popup_type_add');
export const popupImageModal = document.querySelector('.popup_type_image');

//Кнопки
export const popupProfileOpenButton = document.querySelector('.profile__edit-button');
export const popupElementOpenButton = document.querySelector('.profile__add-button');

//Формы
export const formProfile = popupProfileModal.querySelector('.form');
export const formAddCard = popupElementModal.querySelector('.form');

// //Инпуты
export const nameInput = formProfile.querySelector('.form__item_type_name');
export const jobInput = formProfile.querySelector('.form__item_type_about');

//вставка для Темплэйта
export const elementsList = document.querySelector('.elements');

