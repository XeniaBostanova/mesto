//Показываем браузерный текст ошибки из спана и подчеркиваем невалидное поле
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//Скрываем сообщение об ошибке из спана
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//Проверяем валидность инпута
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

//Функция проверки наличия хотя бы одного невалиного инпута
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Деактивируем кнопку сабмита при невалидном инпуте
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//Обработчик событий input для всех полей формы
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })
  })
}

//Записываем объект в переменную
const selectors = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}

//Разбиваем объект на переменные с помощью деструктуризации
const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = selectors;

//Валидация всех форм
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
}

enableValidation(selectors);
