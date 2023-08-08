export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

    // показать ошибку валидации поля
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
    }

    // скрыть ошибку валидации поля
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.classList.remove(this._settings.errorClass);
      errorElement.textContent = '';
    }

  // МЕТОД - ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ

  _checkInputValidity(inputElement) {

    // // показать ошибку валидации поля
    // const showInputError = (inputElement, errorMessage) => {
    //   const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    //   inputElement.classList.add(this._settings.inputErrorClass);
    //   errorElement.textContent = errorMessage;
    //   errorElement.classList.add(this._settings.errorClass);
    // }

    // // скрыть ошибку валидации поля
    // const hideInputError = (inputElement) => {
    //   const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    //   inputElement.classList.remove(this._settings.inputErrorClass);
    //   errorElement.classList.remove(this._settings.errorClass);
    //   errorElement.textContent = '';
    // }

    // проверить валидность поля и показать ошибку, если необходимо
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }

  } 
  
  _hasInvalidInput () {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  // МЕТОД - УПРАВЛЕНИЕ СОСТОЯНИЕМ КНОПКИ САБМИТА

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.disabled = true;
      this._submitButtonElement.classList.add(this._settings.inactiveButtonClass); // fix .classList
    } else {
      this._submitButtonElement.disabled = false;
      this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
    }
    
  } 


  // МЕТОД - УСТАНОВКА ВСЕХ ОБРАБОТЧИКОВ
  
  _setEventListeners() {
    this._toggleSubmitButtonState(); // fix имя метода
    this._inputList.forEach((inputElement) => {
      // inputElement.addEventListener('input', function () {
      //   inputElement._checkInputValidity(); // что тут ???
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement); // что тут ???
        this._toggleSubmitButtonState(); // fix имя метода
      });
    });

  } 


  // МЕТОД - ВКЛЮЧЕНИЕ ВАЛИДАЦИИ ФОРМЫ
  
  enableValidation() { 
    // устанавливаю слушатель отмены дефолтного поведения формы  при сабмите
    this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    // вызываю приватный метод для установки слушателей на все поля формы
    this._setEventListeners(); 
  }; 
  
  // нужно ли this._formElement.add... ???
  
  
  // Функция сброса ошибок при открытии модальных окон
  resetErrors() { 
    //const inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    });
    this._toggleSubmitButtonState(); 
  } 
}







// config - объект с селекторами и классами формы


// // показ ошибки валидации поля
// const showInputError = (formElement, inputElement, errorMessage, settings) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(settings.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(settings.errorClass);
// }
  

// // скрытие ошибки валидации поля
// const hideInputError = (formElement, inputElement, settings) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(settings.inputErrorClass);
//     errorElement.classList.remove(settings.errorClass);
//     errorElement.textContent = '';
// }


// // проверка валидности поля и показать ошибку, если необходимо
// const checkInputValidity = (formElement, inputElement, settings) => {
//     if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//     } else {
//     inputElement.setCustomValidity('');
//     }
  
//     if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage, settings);
//     } else {
//       hideInputError(formElement, inputElement, settings);
//     }
// }


// // установка валидатора на форму

// const setEventListeners = (formElement, settings) => {
//     const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
//     const buttonElement = formElement.querySelector(settings.submitButtonSelector);
//     toggleButtonState(inputList, buttonElement, settings);
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', function () {
//         checkInputValidity(formElement, inputElement, settings);
//         toggleButtonState(inputList, buttonElement, settings);
//       });
//     });
// }


// // проверка наличия невалидного поля

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputList) => {
//       return !inputList.validity.valid;
//     });
// }


// // управление активностью кнопки сабмита

// const toggleButtonState = (inputList, buttonElement, settings) => {
//     if (hasInvalidInput(inputList)) {
//       buttonElement.disabled = true;
//       buttonElement.classList.add(settings.inactiveButtonClass);
//     } else {
//       buttonElement.disabled = false;
//       buttonElement.classList.remove(settings.inactiveButtonClass);
//     }
// }


// // установка валидатора на все формы на странице

// export function enableValidation (settings) {
//     const formList = Array.from(document.forms);
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', function (evt) {
//         evt.preventDefault();
//       });
//       setEventListeners(formElement, settings);
//     });
// }



