export default class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    const deleteButton = this._element.querySelector('.element__delete-button');

    this._likeButton.addEventListener('click', () => this._likeHandler());
    deleteButton.addEventListener('click', () => this._deleteHandler());
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementTitle = this._element.querySelector('.element__title');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    elementTitle.textContent = this._name;

    return this._element;
  }
}
