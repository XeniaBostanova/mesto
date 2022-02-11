import { openPopup, closePopup } from './utils.js';
import { popupImageModal, popupImageCloseButton, popupImageCaption, popupImageItem } from './constants.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const elementCard = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return elementCard;
  }

  //Лайк карточки
  _likeHandler() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  //Удаление карточки
  _deleteHandler() {
    this._element.remove();
  }

  //Открытие попапа с картинкой карточки
  _createPopupImage() {
    popupImageItem.src = this._link;
    popupImageItem.alt = this._name;
    popupImageCaption.textContent = this._name;

    openPopup(popupImageModal);
  }

  _setEventListeners() {
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    const deleteButton = this._element.querySelector('.element__delete-button');

    this._likeButton.addEventListener('click', () => this._likeHandler());
    deleteButton.addEventListener('click', () => this._deleteHandler());
    this._elementImage.addEventListener('click', () => this._createPopupImage());

    popupImageCloseButton.addEventListener('click', () => closePopup(popupImageModal));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementTitle = this._element.querySelector('.element__title');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._link;
    elementTitle.textContent = this._name;

    return this._element;
  }
}
