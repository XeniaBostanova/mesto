
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector('.popup__close');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose());
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose());
  }

  _handleEscClose() {
    return (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());

    const popups = document.querySelectorAll('.popup')
    popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close(popup);
        }
      });
    });
  }
}
