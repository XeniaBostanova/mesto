import { initialCards, selectors, popups, popupProfileModal,
popupElementModal, popupProfileOpenButton, popupProfileCloseButton, popupElementOpenButton,
popupElementCloseButton, editSubmitButton, addSubmitButton, formProfile, formAddCard,
nameInput, jobInput, titleInput, linkInput, profileTitle, profileCaption, elementsList } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup, resetValidation, disableSubmitButton } from './utils.js';

//Создаем экземпляр класса для каждой формы
const profileFormValidator = new FormValidator(selectors, formProfile);
const addCardFormValidator = new FormValidator(selectors, formAddCard);

//Включаем валидацию форм
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Функция вставки карточки на страницу
function renderCard(elemCard) {
  const card = new Card (elemCard, '.element-template');
  const cardElement = card.generateCard();

  elementsList.prepend(cardElement);
}

//Создаем карточки из массива
initialCards.forEach(renderCard);

//Закрытие попапов на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

//Попап редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfileModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileCaption.textContent;
  disableSubmitButton(editSubmitButton);
  resetValidation();
});
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfileModal));

//Попап добавления карточек
popupElementOpenButton.addEventListener('click', () => {
  openPopup(popupElementModal);
  disableSubmitButton(addSubmitButton);
  resetValidation();
});
popupElementCloseButton.addEventListener('click', () => {
  closePopup(popupElementModal);
  formAddCard.reset();
});

//Изменение данных профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;

  closePopup(popupProfileModal);
});

//Добавление новой карточки
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: titleInput.value,
    link: linkInput.value
  });

  closePopup(popupElementModal);
  formAddCard.reset();
});
