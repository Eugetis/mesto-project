import Popup from './Popup.js';
import { popupForImagePictureSelector, popupForImageCaptionSelector } from '../utils/constants.js';


export default class PopupWithImage extends Popup {
  
  constructor(selector) {
    super(selector);
    this._popupPicture = this._popup.querySelector(popupForImagePictureSelector);
    this._popupCaption = this._popup.querySelector(popupForImageCaptionSelector);
  }

  // перезаписанный родительский метод открытия попапа
  open(data) {
    this._popupPicture.src = data.link;
    this._popupPicture.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.open();
  }
  
}