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

//Все попапы
export const popups = document.querySelectorAll('.popup');

//Модалки
export const popupProfileModal = document.querySelector('.popup_type_edit');
export const popupElementModal = document.querySelector('.popup_type_add');
export const popupImageModal = document.querySelector('.popup_type_image');

//Кнопки
export const popupProfileOpenButton = document.querySelector('.profile__edit-button');
export const popupProfileCloseButton = popupProfileModal.querySelector('.popup__close');

export const popupElementOpenButton = document.querySelector('.profile__add-button');
export const popupElementCloseButton = popupElementModal.querySelector('.popup__close');

export const popupImageCloseButton = popupImageModal.querySelector('.popup__close');

//Формы
export const formProfile = popupProfileModal.querySelector('.form');
export const formAddCard = popupElementModal.querySelector('.form');

//Инпуты
export const nameInput = formProfile.querySelector('.form__item_type_name');
export const jobInput = formProfile.querySelector('.form__item_type_about');

export const titleInput = formAddCard.querySelector('.form__item_type_title');
export const linkInput = formAddCard.querySelector('.form__item_type_link');

//Профайл
export const profileTitle = document.querySelector('.profile__title');
export const profileCaption = document.querySelector('.profile__caption');

//вставка для Темплэйта
export const elementsList = document.querySelector('.elements');

//Попап с картинкой
export const popupImageItem = popupImageModal.querySelector('.popup__image-item');
export const popupImageCaption = popupImageModal.querySelector('.popup__image-caption');
