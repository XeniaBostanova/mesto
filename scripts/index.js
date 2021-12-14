const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);

// Находим форму в DOM
let formElement = document.querySelector('.form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__item_name');
let jobInput = formElement.querySelector('.form__item_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    console.log(nameInput.value);
    console.log(jobInput.value);
    // Получите значение полей jobInput и nameInput из свойства value

    let profileTitle = document.querySelector('.profile__title');
    let profileCaption = document.querySelector('.profile__caption');
    // Выберите элементы, куда должны быть вставлены значения полей

    profileTitle.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//Кнопка "Сохранить" закрывет форму
let saveCloseFormButton = document.querySelector('.form__button');

function saveCloseForm() {
  popup.classList.remove('popup_opened');
}

saveCloseFormButton.addEventListener('click', saveCloseForm);

let profileTitle = document.querySelector('.profile__title');
let profileCaption = document.querySelector('.profile__caption');

//Закрываем измененную форму без сохранения
function noChangeform() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileCaption.textContent;
}

popupOpenButton.addEventListener('click', noChangeform);
