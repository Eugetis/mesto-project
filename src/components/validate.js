// ФУНКЦИОНАЛ ВАЛИДАЦИИ ФОРМ 


// показ ошибки валидации поля

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}
  

// скрытие ошибки валидации поля

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}


// проверка валидности поля и показать ошибку, если необходимо

const checkInputValidity = (formElement, inputElement, settings) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity('');
    }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
}


// установка валидатора на форму

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
}


// проверка наличия невалидного поля

const hasInvalidInput = (inputList) => {
    return inputList.some((inputList) => {
      return !inputList.validity.valid;
    });
}


// управление активностью кнопки сабмита

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
}


// установка валидатора на все формы на странице

export function enableValidation (settings) {
    const formList = Array.from(document.forms);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, settings);
    });
}


// Функция сброса ошибок при открытии модальных окон

export function resetError(formElement, settings) { 
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach(inputElement => hideInputError(formElement, inputElement, settings));
  toggleButtonState(inputList, formElement.querySelector(settings.submitButtonSelector), settings); 
} 
