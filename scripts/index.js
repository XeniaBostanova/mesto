//Все попапы
const popups = document.querySelectorAll('.popup');

//Модалки
const popupProfileModal = document.querySelector('.popup_type_edit');
const popupElementModal = document.querySelector('.popup_type_add');
const popupImageModal = document.querySelector('.popup_type_image');

//Кнопки
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfileModal.querySelector('.popup__close');

const popupElementOpenButton = document.querySelector('.profile__add-button');
const popupElementCloseButton = popupElementModal.querySelector('.popup__close');

const popupImageCloseButton = popupImageModal.querySelector('.popup__close');

const editSubmitButton = popupProfileModal.querySelector('.form__button_type_edit');
const addSubmitButton = popupElementModal.querySelector('.form__button_type_add');

//Формы
const formProfile = popupProfileModal.querySelector('.form');
const formElement = popupElementModal.querySelector('.form');

//Инпуты
const nameInput = formProfile.querySelector('.form__item_type_name');
const jobInput = formProfile.querySelector('.form__item_type_about');

const titleInput = formElement.querySelector('.form__item_type_title');
const linkInput = formElement.querySelector('.form__item_type_link');

//Профайл
const profileTitle = document.querySelector('.profile__title');
const profileCaption = document.querySelector('.profile__caption');

//Темплэйты
const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

//Картинка попап
const popupImageItem = popupImageModal.querySelector('.popup__image-item');
const popupImageCaption = popupImageModal.querySelector('.popup__image-caption');


//Функция удаления карточки
function deleteHandler(evt) {
  evt.target.closest('.element').remove();
}

//Функция создания карточек из массива
function createElement (elementData) {
  const elementCard = elementTemplate.cloneNode(true);
  const elementItem = elementCard.querySelector('.element__item');
  const elementTitle = elementCard.querySelector('.element__title');
  const deleteButton = elementCard.querySelector('.element__delete-button');
  const likeButton = elementCard.querySelector('.element__like-button');

  elementTitle.textContent = elementData.name;
  elementItem.src = elementData.link;
  elementItem.alt = elementData.name;

  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));
  deleteButton.addEventListener('click', deleteHandler);

  //Функция открытия картинки карточки
  function createPopupImage () {
    popupImageItem.src = elementData.link;
    popupImageItem.alt = elementData.name;
    popupImageCaption.textContent = elementData.name;

    openPopup(popupImageModal);
  }

  elementItem.addEventListener('click', createPopupImage);

  return elementCard;
}

//Функция вставки карточки на страницу
function renderCard(elemCard) {
  const newElement = createElement(elemCard);
  elementsList.prepend(newElement);
}

//Создаем карточки из массива
initialCards.forEach(renderCard);

//Открытие попапа
function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

//Закрытие попапа
function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

//Закрытие попапов на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
      resetValidation();
    }
  });
})

//Функция закрытия попапа на esc
function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
      resetValidation();
  }
}

//Функция деактивации кнопки submit
function disableSubmitButton (submitButtonSelector) {
  submitButtonSelector.setAttribute('disabled', true);
  submitButtonSelector.classList.add(inactiveButtonClass);
}

//Функция удаления сообщений спанов после закрытия попапов с input-error
function deleteActiveSpans () {
  const spansActive = document.querySelectorAll(`.${errorClass}`);
  spansActive.forEach((errorSpanMessage) => {
   errorSpanMessage.textContent = '';
  });
}

//Функция удаления красного подчеркивания невалидных полей после закрытия попапов с input-error
function deleteInputErrorStyle () {
  const inputErrors = document.querySelectorAll(`.${inputErrorClass}`);
  inputErrors.forEach((inputElement) => {
    inputElement.classList.remove(inputErrorClass);
  });
}

//Функция комплексного сброса валидации инпутов
function resetValidation () {
  deleteInputErrorStyle();
  deleteActiveSpans();
  formElement.reset();
}

//Попап редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfileModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileCaption.textContent;
  disableSubmitButton(editSubmitButton);
});
popupProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfileModal);
  resetValidation();
});

//Попап добавления карточек
popupElementOpenButton.addEventListener('click', () => {
  openPopup(popupElementModal);
  disableSubmitButton(addSubmitButton);
});
popupElementCloseButton.addEventListener('click', () => {
  closePopup(popupElementModal);
  resetValidation();
});

//Попап закрытия картинки карточки
popupImageCloseButton.addEventListener('click', () => closePopup(popupImageModal));

//Изменение данных профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;

  closePopup(popupProfileModal);
  resetValidation();
});

//Добавление новой карточки
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: titleInput.value,
    link: linkInput.value
  });

  closePopup(popupElementModal);
  resetValidation();
});
