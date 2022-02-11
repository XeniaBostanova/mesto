import { selectors } from "./constants.js";

//Открытие попапа
export function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

//Закрытие попапа
export function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

//Функция закрытия попапа на esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Функция комплексного сброса валидации инпутов
export function resetValidation () {
  deleteInputErrorStyle();
  deleteActiveSpans();
}

//Разбиваем объект на переменные с помощью деструктуризации
const {inactiveButtonClass, inputErrorClass, errorClass} = selectors;

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

//Функция деактивации кнопки submit
export function disableSubmitButton (submitButtonSelector) {
  submitButtonSelector.setAttribute('disabled', true);
  submitButtonSelector.classList.add(inactiveButtonClass);
}
