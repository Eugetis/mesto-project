export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.setEventListeners();
    this._popup.addEventListener('keydown', () => {
        this._handleEscClose();
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      this._popup.close();
    };
  }

  setEventListeners() {
    // слушатель закрытия по клику на крестик
    this._popup.querySelector('.popup__close').addEventListener('click', this._popup.close()); 
    // слушатель закрытия по клику на оверлей
    this._popup.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this._popup.close();
      };
    }); 
  }

}