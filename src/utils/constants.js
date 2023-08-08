export const cardListSelector = '.articles__grid';
export const articleTemplateSelector = '.article';
export const authorNameSelector = '.author__name-text';
export const authorJobSelector = '.author__position';
export const authorAvatarSelector = '.author__avatar';
export const popupAuthorSelector = '.p-author';
export const popupCardSelector = '.p-card';
export const popupAvatarSelector = '.p-avatar';
export const popupForImageSelector = '.popup_type_pic';
export const popupForImagePictureSelector = '.popup__picture';
export const popupForImageCaptionSelector = '.popup__caption';
export const popupAuthorOpenBtn = document.querySelector('.author__name-edit');
export const profileForm = document.forms['profile-form'];
export const newUserData = profileForm.querySelector('fieldset.popup__form-fields');
export const popupCardOpenBtn = document.querySelector('.author__add');
export const cardForm = document.forms['card-form'];
export const cardToAdd = cardForm.querySelector('fieldset.popup__form-fields');
export const popupAvatarOpenBtn = document.querySelector('.author__avatar-edit');
export const avatarForm = document.forms['avatar-form'];
export const newUserAvatar = avatarForm.querySelector('fieldset.popup__form-fields');
export const nameInput = profileForm.elements.authorName;
export const jobInput = profileForm.elements.authorPosition;
export const authorNamePublished = document.querySelector('.author__name-text');
export const authorJobPublished = document.querySelector('.author__position');

export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-field',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_inactive',
    inputErrorClass: 'popup__form-field_type-error',
    errorClass: 'popup__form-field-error_active'
};