export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }

  // метод для открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
        this._handleEscClose(evt);
    });
  }

  // метод для закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  // метод для закрытия попапа по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  // метод для установки слушателей закрытия попапа по клику на крестик и на оверлей
  setEventListeners() {
    // слушатель закрытия по клику на крестик
    this._popup.querySelector('.popup__close').addEventListener('click', () => {this.close()}); 
    // слушатель закрытия по клику на оверлей
    this._popup.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      };
    }); 
  }

}