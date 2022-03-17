export default class Card {
  constructor(data, cardSelector, {handleCardClick, handleDeleteClick, handleLikeClick}, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._userId = userId;
  }

  _getTemplate() {
    const elementCard = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return elementCard;
  }

  //Удаление карточки
  deleteAddedCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  //Лайк карточки
  _putLike() {
    this._likeButton.classList.add('element__like-button_active');
  }

  _removeLike() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._element.querySelector('.element__like-count');
    likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._putLike();
    } else {
      this._removeLike();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementTitle = this._element.querySelector('.element__title');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    elementTitle.textContent = this._name;
    this.setLikes(this._likes);

    if(this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }

    return this._element;
  }
}
