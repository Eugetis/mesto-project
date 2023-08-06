import Popup from './Popup.js';
//import { popupForImagePicture, popupForImageCaption } from '../utils/constants.js';
import { popupForImagePictureSelector, popupForImageCaptionSelector } from '../utils/constants.js';

// export default class PopupWithImage extends Popup {
//   constructor(data, selector) {
//     super(selector);
//     // this._popup = document.querySelector(this._selector);
//     this._link = data.link;
//     this._name = data.name;
//   }

//   open() {
//     super.open();
//     popupForImagePicture.src = this._link;
//     popupForImagePicture.alt = this._name;
//     popupForImageCaption.textContent = this._name;
//   }
// }

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupPicture = this._popup.querySelector(popupForImagePictureSelector);
    this._popupCaption = this._popup.querySelector(popupForImageCaptionSelector);
  }

  open(data) {
    this._popupPicture.src = data.link;
    this._popupPicture.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.open();
  }
}