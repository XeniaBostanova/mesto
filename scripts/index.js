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

const submitButton = document.querySelector('.form__button');
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

    toggle(popupImageModal);
  }

  elementItem.addEventListener('click', createPopupImage);

  return elementCard;
}

//Функция вставки карточки на страницу
function renderCard(elementCard) {
  const newElement = createElement(elementCard);
  elementsList.prepend(newElement);
}

//Создаем карточки из массива
initialCards.forEach(renderCard);

//Функция открытия/закрытия попапа
function toggle(modal) {
  modal.classList.toggle('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
  deleteActiveSpans();
  deleteInputErrorStyle();
  formElement.reset();
}

//Закрытие попапов на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      toggle(popup);
    }
  });
})

//Функция закрытия попапа на esc
function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      toggle(openedPopup);
  }
}

//Функция деактивации кнопки submit
function disableSubmitButton (submitButton) {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('form__button_disabled');
}

//Функция удаления сообщений спанов после закрытия попапов с input-error
function deleteActiveSpans () {
  const spansActive = document.querySelectorAll('.form__input-error_active');
  spansActive.forEach((errorSpanMessage) => {
   errorSpanMessage.textContent = '';
  });
}

//Функция удаления красного подчеркивания невалидных полей после закрытия попапов с input-error
function deleteInputErrorStyle () {
  const inputErrors = document.querySelectorAll('.form__item_type_error');
  inputErrors.forEach((inputElement) => {
    inputElement.classList.remove('form__item_type_error');
  });
}

//Попап редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileCaption.textContent;
  toggle(popupProfileModal);
  disableSubmitButton(editSubmitButton);
});
popupProfileCloseButton.addEventListener('click', () => toggle(popupProfileModal));

//Попап добавления карточек
popupElementOpenButton.addEventListener('click', () => {
  toggle(popupElementModal);
  disableSubmitButton(addSubmitButton);
});
popupElementCloseButton.addEventListener('click', () => toggle(popupElementModal));

//Попап закрытия картинки карточки
popupImageCloseButton.addEventListener('click', () => toggle(popupImageModal));

//Изменение данных профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;

  toggle(popupProfileModal);
});

//Добавление новой карточки
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: titleInput.value,
    link: linkInput.value
  });

  toggle(popupElementModal);
  formElement.reset();
});
