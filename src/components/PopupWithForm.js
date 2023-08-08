import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы (содержится метод класса Api)
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._popup.querySelector('.popup__form-button');
    this._formSubmitCallback = formSubmitCallback;
  }
  
  // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__form-field'));
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  
  //Перезаписывает родительский метод setEventListeners. 
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
  // но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._formSubmitCallback(this._getInputValues());
    });
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupSubmitButton.innerText = 'Сохранение...';
    } else {
      setTimeout(() => {this._popupSubmitButton.innerText = this._popupSubmitButton.dataset.text}, 300);
    }
  }

}

// resetError(popupAuthor.querySelector('.popup__form'), settings);




// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.