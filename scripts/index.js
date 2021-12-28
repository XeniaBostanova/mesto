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

function deleteHandler(evt) {
  evt.target.closest('.element').remove();
};

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

  function createPopupImage () {
    popupImageItem.src = elementData.link;
    popupImageItem.alt = elementData.name;
    popupImageCaption.textContent = elementData.name;

    toggle(popupImageModal);
  };

  elementItem.addEventListener('click', createPopupImage);

  return elementCard;
};

function renderCard (elementCard) {
  const newElement = createElement(elementCard);
  elementsList.prepend(newElement);
}

initialCards.forEach(renderCard);

function toggle(modal) {
  modal.classList.toggle('popup_opened');
};

popupProfileOpenButton.addEventListener('click', () => {
  toggle(popupProfileModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileCaption.textContent;
});
popupProfileCloseButton.addEventListener('click', () => toggle(popupProfileModal));

popupElementOpenButton.addEventListener('click', () => toggle(popupElementModal));
popupElementCloseButton.addEventListener('click', () => toggle(popupElementModal));

popupImageCloseButton.addEventListener('click', () => toggle(popupImageModal));

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;

  toggle(popupProfileModal);
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: titleInput.value,
    link: linkInput.value
  });

  toggle(popupElementModal);
  formElement.reset();
});
