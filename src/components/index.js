import '../pages/style.css';
import { enableValidation } from './validate.js';
import { createCard } from './card.js';
import { initialCards } from './utils.js';
import { openPopupAuthor, openPopupCard, closePopup } from './modal.js';

const popupAuthorOpenBtn = document.querySelector('.author__name-edit');
const profileForm = document.forms['profile-form'];
const profileSubmitButton = profileForm.querySelector('.popup__form-button');
const popupCardOpenBtn = document.querySelector('.author__add');
const cardForm = document.forms['card-form'];
const cardToAdd = cardForm.querySelector('fieldset.popup__form-fields');
const cardNameInput = cardForm.elements.cardName;
const cardLinkInput = cardForm.elements.imgLink;
const cardSubmitButton = cardForm.querySelector('.popup__form-button');
const articlesGrid = document.querySelector('.articles__grid');

export const articleTemplate = document.querySelector('#article').content;
export const popupPic = document.querySelector('.popup_type_pic');
export const popupPicPicture = popupPic.querySelector('.popup__picture');
export const popupPicCaption = popupPic.querySelector('.popup__caption');
export const popupAuthor = document.querySelector('.p-author');
export const popupCard = document.querySelector('.p-card');
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


// Вызов установщика валидатора на все формы на странице 

enableValidation(settings);


// Установка слушателей открытия попапов

popupAuthorOpenBtn.addEventListener('click', openPopupAuthor);
popupCardOpenBtn.addEventListener('click', openPopupCard);


// Функция добавления карточки в начало списка

function prependCard (card) {
  articlesGrid.prepend(createCard(card));
}


// Отправка формы добавления карточки

function addNewCard (evt) {
  evt.preventDefault(); 
  cardToAdd.name = cardNameInput.value;
  cardToAdd.link = cardLinkInput.value;
  prependCard(cardToAdd);
  cardSubmitButton.disabled = true;
  cardSubmitButton.classList.add('popup__form-button_inactive');
  evt.target.reset();
  closePopup(evt.target.closest('.popup'));
}


// Добавление карточек при загрузке и установка слушателя отправки формы добавления новой карточки

initialCards.forEach(prependCard);
cardForm.addEventListener('submit', addNewCard);


// Отправка формы редактирования профиля автора

function editAuthor (evt) {
  evt.preventDefault(); 
  authorNamePublished.textContent = nameInput.value;
  authorJobPublished.textContent = jobInput.value;
  profileSubmitButton.disabled = true;
  profileSubmitButton.classList.add('popup__form-button_inactive');
  closePopup(evt.target.closest('.popup'));
}


// Установка слушателя отправки формы редактирования профиля

profileForm.addEventListener('submit', editAuthor);