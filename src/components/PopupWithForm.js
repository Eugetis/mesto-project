import Popup from './Popup.js';
import { settings } from '../utils/constants.js';


export default class PopupWithForm extends Popup {

  constructor(selector, formSubmitCallback) {
    super(selector);
    this._popupForm = this._popup.querySelector(settings.formSelector);
    this._popupSubmitButton = this._popup.querySelector(settings.submitButtonSelector);
    this._formSubmitCallback = formSubmitCallback;
  }
  
  // метод собирает данные всех полей формы
  _getInputValues() {
    this._inputList = Array.from(this._popupForm.querySelectorAll(settings.inputSelector));
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  
  // перезаписанный родительский метод добавляет обработчики клика и сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._formSubmitCallback(this._getInputValues());
    });
  }

  // перезаписанный родительский метод close с добавленным сбросом формы
  close() {
    super.close();
    this._popupForm.reset();
  }

  // метод для управления текстом кнопки сабмита
  renderLoading(isLoading) {
    if(isLoading) {
      this._popupSubmitButton.innerText = 'Сохранение...';
    } else {
      setTimeout(() => {this._popupSubmitButton.innerText = this._popupSubmitButton.dataset.text}, 300);
    }
  }

}