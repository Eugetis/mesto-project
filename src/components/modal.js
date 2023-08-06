import { popupAuthor, popupCard, popupAvatar, nameInput, jobInput, authorNamePublished, authorJobPublished, settings } from './index.js';
import { resetError } from './validate.js';


// полный функционал открытия попапа с навешиванием слушателей
// ЗАКОММЕНТИТЬ
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupByOverlayClick);
  document.addEventListener('keydown', closePopupByEscape);
}


// полный функционал закрытия попапа с удалением слушателей
// ЗАКОММЕНТИТЬ
export function closePopup(popup) {
  popup.removeEventListener('mousedown', closePopupByOverlayClick);
  document.removeEventListener('keydown', closePopupByEscape);
  popup.classList.remove('popup_opened');
}


// закрытие попапа по клику на оверлей

// function closePopupByOverlayClick(evt) {
// if (evt.currentTarget === evt.target) {
//   closePopup(evt.currentTarget);
// };
// }


// закрытие попапа по нажатию на Esc

// function closePopupByEscape(evt) {
// if (evt.key === 'Escape') {
//   const openedPopup = document.querySelector('.popup_opened');
//   closePopup(openedPopup);
// };
// }


// Универсальный обработчик закрытия попапа по крестику

// document.querySelectorAll('.popup__close').forEach((btn) => {
//     const popupToClose = btn.closest('.popup');
//     btn.addEventListener('click', () => closePopup(popupToClose));
// });


// Открытие попапа редактирования профиля с подстановкой текущих значений

function fillProfileInputs() {
    nameInput.value = authorNamePublished.textContent;
    jobInput.value = authorJobPublished.textContent;
}

export function openPopupAuthor() {
  openPopup(popupAuthor);
  fillProfileInputs();
  resetError(popupAuthor.querySelector('.popup__form'), settings);
}


// Открытие попапа добавления карточки

export function openPopupCard() {
    openPopup(popupCard);
    resetError(popupCard.querySelector('.popup__form'), settings);
}


// Открытие попапа обновления аватара

export function openPopupAvatar() {
  openPopup(popupAvatar);
  resetError(popupAvatar.querySelector('.popup__form'), settings);
}
