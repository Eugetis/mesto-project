import { editAuthor, openPopupAuthor, openPopupCard } from './modal.js';
import { enableValidation } from './validate.js';
import { prependCard, initialCards, addNewCard } from './card.js';


const popupAuthorOpenBtn = document.querySelector('.author__name-edit');
const profileForm = document.forms['profile-form'];
const popupCardOpenBtn = document.querySelector('.author__add');
const cardForm = document.forms['card-form'];


// Вызов установщика валидатора на все формы на странице 

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-field_type-error',
  errorClass: 'popup__form-field-error_active'
});


// Установка слушателей открытия попапов

popupAuthorOpenBtn.addEventListener('click', openPopupAuthor);
popupCardOpenBtn.addEventListener('click', openPopupCard);


// Установка слушателя отправки формы редактирования профиля

profileForm.addEventListener('submit', editAuthor);


// Добавление карточек при загрузке и установка слушателя отправки формы добавления новой карточки

initialCards.forEach(prependCard);
cardForm.addEventListener('submit', addNewCard);

