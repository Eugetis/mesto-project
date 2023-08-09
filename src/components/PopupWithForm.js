import Popup from './Popup.js';
import { settings } from '../utils/constants.js';


export default class PopupWithForm extends Popup {

  constructor(selector, formSubmitCallback) {
    super(selector);
    this._popupForm = this._popup.querySelector(settings.formSelector);
    this._popupSubmitButton = this._popup.querySelector(settings.submitButtonSelector);
    this._inputList = Array.from(this._popupForm.querySelectorAll(settings.inputSelector));
    this._formSubmitCallback = formSubmitCallback;
  }
  
  // метод собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  
  // метод вставки данных в инпуты
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // перезаписанный родительский метод добавляет обработчики клика и сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const initialText = this._popupSubmitButton.textContent;
        this._popupSubmitButton.textContent = 'Сохранение...';
        this._formSubmitCallback(this._getInputValues())
          .then(() => this.close())
          .finally(() => {
            this._popupSubmitButton.textContent = initialText;
          });
    });
  }

  // перезаписанный родительский метод close с добавленным сбросом формы
  close() {
    super.close();
    this._popupForm.reset();
  }

}