export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  //Показываем браузерный текст ошибки из спана и подчеркиваем невалидное поле
  _showInputError(inputElement, errorMessage) {
    const {inputErrorClass, errorClass} = this._config;

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  //Скрываем сообщение об ошибке из спана
  _hideInputError(inputElement) {
    const {inputErrorClass, errorClass} = this._config;

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  //Проверяем валидность инпута
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Проверка наличия хотя бы одного невалиного инпута
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Сброс валидации
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //Деактивируем кнопку сабмита при невалидном инпуте
  _toggleButtonState() {
    const {inactiveButtonClass} = this._config;

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  //Обработчик событий input для всех полей формы
  _setEventListeners() {
    const {inputSelector, submitButtonSelector} = this._config

    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
    this._buttonElement = this._form.querySelector(submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //Валидация форм
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      this._setEventListeners();
  }
}
