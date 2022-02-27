import Popup from './Popup.js';
import {popupImageModal} from './constants.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageItem = popupImageModal.querySelector('.popup__image-item');
    this._popupImageCaption = popupImageModal.querySelector('.popup__image-caption');
  }

  open(name, link) {
    this._popupImageItem.src = link;
    this._popupImageItem.alt = name;
    this._popupImageCaption.textContent = name;
    super.open();
  }
}
