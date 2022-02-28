import './index.css'
import { initialCards, selectors, popupProfileOpenButton, popupElementOpenButton,
formProfile, formAddCard, elementsList, nameInput, jobInput } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//Создаем экземпляр класса для каждой формы
const profileFormValidator = new FormValidator(selectors, formProfile);
const addCardFormValidator = new FormValidator(selectors, formAddCard);

//Включаем валидацию форм
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Попап с картинкой
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

//Разметка начальных карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-template', {
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      }
    });
    const cardElement = card.generateCard();
    return cardElement;
  }
}, elementsList);

cardsList.renderItems();

//Попап добавления карточек
const popupAddCard = new PopupWithForm('.popup_type_add', {
  handleFormSubmit: (formData) => {
    cardsList.addItem(formData);
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
