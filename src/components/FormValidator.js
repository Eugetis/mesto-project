export default class FormValidator {
  
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  // метод для показа ошибки валидации поля
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  // метод для скрытия ошибки валидации поля
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  // метод для проверки валидности поля
  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
    // проверить валидность поля и показать ошибку, если необходимо
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  } 
  
  // метод для проверки наличия невалидного поля
  _hasInvalidInput () {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  // метод для управления состоянием кнопки сабмита
  _toggleSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.disabled = true;
      this._submitButtonElement.classList.add(this._settings.inactiveButtonClass); 
    } else {
      this._submitButtonElement.disabled = false;
      this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  } 

  // метод для установки всех обработчиков
  _setEventListeners() {
    this._toggleSubmitButtonState(); 
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  } 

  // метод для включения валидации формы
  enableValidation() { 
    // установка слушателя отмены дефолтного поведения формы  при сабмите
    this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    // вызов приватного метода для установки слушателей на все поля формы
    this._setEventListeners(); 
  }; 
  
  // метод сброса ошибок при открытии модальных окон
  resetErrors() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    });
    this._toggleSubmitButtonState(); 
  } 
  
}



