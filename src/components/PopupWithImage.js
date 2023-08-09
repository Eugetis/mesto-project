import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  
  constructor(selector, pictureSelector, captionSelector) {
    super(selector);
    this._popupPicture = this._popup.querySelector(pictureSelector);
    this._popupCaption = this._popup.querySelector(captionSelector);
  }

  // перезаписанный родительский метод открытия попапа
  open(data) {
    this._popupPicture.src = data.link;
    this._popupPicture.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.open();
  }
  
}