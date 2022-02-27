import '../pages/index.css'
import { initialCards, selectors, popupProfileOpenButton, popupElementOpenButton,
formProfile, formAddCard, elementsList, nameInput, jobInput } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

//Создаем экземпляр класса для каждой формы
const profileFormValidator = new FormValidator(selectors, formProfile);
const addCardFormValidator = new FormValidator(selectors, formAddCard);

//Включаем валидацию форм
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Попап с картинкой
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

//Функция создания экземпляра карточки
function createCard(item) {
  const card = new Card(item, '.element-template', {
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

//Разметка начальных карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const elemCard = createCard(cardItem);
    cardsList.addItem(elemCard);
  }
}, elementsList);

cardsList.renderItems();

//Попап добавления карточек
const popupAddCard = new PopupWithForm('.popup_type_add', {
  handleFormSubmit: (formData) => {
    const newCard = createCard(formData);
    cardsList.addItem(newCard);
  }
});

popupElementOpenButton.addEventListener('click', () => {
  popupAddCard.open();
  addCardFormValidator.resetValidation();
});
popupAddCard.setEventListeners();

//Попап редактирования профиля
const userInfo = new UserInfo({
  name: '.profile__title',
  job: '.profile__caption'
});

const popupEditProfile = new PopupWithForm('.popup_type_edit', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

popupProfileOpenButton.addEventListener('click', () => {
  popupEditProfile.open();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;

  profileFormValidator.resetValidation();
});
popupEditProfile.setEventListeners();
