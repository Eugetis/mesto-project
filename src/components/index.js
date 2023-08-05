import Api from './Api.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '257608b2-435d-4812-89a7-aa07205ef2dd',
    'Content-Type': 'application/json'
  }
});




import '../pages/style.css';
import { enableValidation } from './validate.js';
import { createCard } from './card.js';
import { openPopupAuthor, openPopupCard, openPopupAvatar, closePopup } from './modal.js';
import { getUserData, getInitialCards, postCustomCard, editAuthorData, editAuthorAvatar } from './api.js';
import { renderLoading } from './utils';

const popupAuthorOpenBtn = document.querySelector('.author__name-edit');
const profileForm = document.forms['profile-form'];
const newUserData = profileForm.querySelector('fieldset.popup__form-fields');
const profileSubmitButton = profileForm.querySelector('.popup__form-button');
const popupCardOpenBtn = document.querySelector('.author__add');
const cardForm = document.forms['card-form'];
const cardToAdd = cardForm.querySelector('fieldset.popup__form-fields');
const cardNameInput = cardForm.elements.cardName;
const cardLinkInput = cardForm.elements.imgLink;
const cardSubmitButton = cardForm.querySelector('.popup__form-button');
const articlesGrid = document.querySelector('.articles__grid');
const popupAvatarOpenBtn = document.querySelector('.author__avatar-edit');
const avatarForm = document.forms['avatar-form'];
const newUserAvatar = avatarForm.querySelector('fieldset.popup__form-fields');
const avatarSubmitButton = avatarForm.querySelector('.popup__form-button');

export const articleTemplate = document.querySelector('#article').content;
export const popupPic = document.querySelector('.popup_type_pic');
export const popupPicPicture = popupPic.querySelector('.popup__picture');
export const popupPicCaption = popupPic.querySelector('.popup__caption');
export const popupAuthor = document.querySelector('.p-author');
export const popupCard = document.querySelector('.p-card');
export const popupAvatar = document.querySelector('.p-avatar');
export const nameInput = profileForm.elements.authorName;
export const jobInput = profileForm.elements.authorPosition;
export const authorNamePublished = document.querySelector('.author__name-text');
export const authorJobPublished = document.querySelector('.author__position');
export let userId = '';
const authorAvatar = document.querySelector('.author__avatar');
const avatarInput = avatarForm.elements.avatarLink;

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-field_type-error',
  errorClass: 'popup__form-field-error_active'
};


// Получение и обработка первичных данных с сервера

function getInitialData() {
  Promise.all([getUserData(), getInitialCards()])
    .then((res) => {
      const userData = res[0];
      const initialCards = res[1];
      userId = userData._id;
      renderUser(userData);
      renderInitialCards(initialCards, userId);
    })
    .catch((err) => {
      console.log(err);
    });
};
getInitialData();


// рендер стартовых данных юзера с сервера

const renderUser = (user) => {
  authorNamePublished.textContent = user.name;
  authorJobPublished.textContent = user.about;
  authorAvatar.src = user.avatar;
}


// рендер первичных карточек с сервера

const renderInitialCards = function(cards, user) {
  cards.forEach((cardData) => {
    const card = createCard(cardData, user);
    articlesGrid.prepend(card);
  });
}


// Вызов установщика валидатора на все формы на странице 

enableValidation(settings);


// Установка слушателей открытия попапов

popupAuthorOpenBtn.addEventListener('click', openPopupAuthor);
popupCardOpenBtn.addEventListener('click', openPopupCard);
popupAvatarOpenBtn.addEventListener('click', openPopupAvatar);


// Отправка формы добавления новой карточки с ее последующим рендером

function addNewCard(evt) {
  evt.preventDefault(); 
  renderLoading(true, cardSubmitButton);
  cardToAdd.name = cardNameInput.value;
  cardToAdd.link = cardLinkInput.value;
  postCustomCard(cardToAdd)
    .then((newCard) => {
      prependCard(newCard, newCard.owner._id);
      evt.target.reset();
      closePopup(evt.target.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, cardSubmitButton);
    });
}


// Функция добавления карточки в начало списка

function prependCard(card, user) {
  articlesGrid.prepend(createCard(card, user));
}


// Установка слушателя отправки формы добавления новой карточки

cardForm.addEventListener('submit', addNewCard);


// Отправка формы редактирования профиля автора

function editAuthor(evt) {
  evt.preventDefault(); 
  renderLoading(true, profileSubmitButton);
  newUserData.name = nameInput.value;
  newUserData.about = jobInput.value;
  editAuthorData(newUserData)
    .then((updatedData) => {
      authorNamePublished.textContent = updatedData.name;
      authorJobPublished.textContent = updatedData.about;
      closePopup(evt.target.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton);
    });
}


// Установка слушателя отправки формы редактирования профиля

profileForm.addEventListener('submit', editAuthor);


// Отправка формы обновления аватара

function editAvatar(evt) {
  evt.preventDefault(); 
  renderLoading(true, avatarSubmitButton);
  newUserAvatar.link = avatarInput.value;
  editAuthorAvatar(newUserAvatar)
    .then((updatedData) => {
      authorAvatar.src = updatedData.avatar;
      evt.target.reset();
      closePopup(evt.target.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    });
}


// Установка слушателя отправки формы редактирования профиля

avatarForm.addEventListener('submit', editAvatar);

