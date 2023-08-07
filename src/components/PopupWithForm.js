import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы (содержится метод класса Api)
  constructor({ selector, formSubmitCallback }) {
    super(selector);
    this._popup = document.querySelector(this._selector);
    this._formSubmitCallback = formSubmitCallback;
  }
  
  // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {

  }
  
  //Перезаписывает родительский метод setEventListeners. 
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
  // но и добавлять обработчик сабмита формы.
  setEventListeners() {

  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {

  }

}

resetError(popupAuthor.querySelector('.popup__form'), settings);




// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.