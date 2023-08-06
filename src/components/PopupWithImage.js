import Popup from './Popup.js';
import { popupForImagePicture, popupForImageCaption } from '../utils/constants.js';


export default class PopupWithImage extends Popup {
  constructor(data, selector) {
    super(selector);
    // this._popup = document.querySelector(this._selector);
    this._link = data.link;
    this._name = data.name;
  }

  open() {
    super.open();
    popupForImagePicture.src = this._link;
    popupForImagePicture.alt = this._name;
    popupForImageCaption.textContent = this._name;
  }
}