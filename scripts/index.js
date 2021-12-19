const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_type_name');
let jobInput = formElement.querySelector('.form__item_type_about');

let profileTitle = document.querySelector('.profile__title');
let profileCaption = document.querySelector('.profile__caption');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileCaption.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileTitle.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;

    closePopup()
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
