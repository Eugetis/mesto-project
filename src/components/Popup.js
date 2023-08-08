export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    //this.setEventListeners();
    document.addEventListener('keydown', (evt) => {
        this._handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // добавлено удаление слушателя escape при закрытии попапа, чтобы не плодить их в памяти из-за открытия
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

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