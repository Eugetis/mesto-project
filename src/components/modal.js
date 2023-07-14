import { openPopup, closePopup, hideClosestPopup } from './utils.js';

const popupAuthor = document.querySelector('.p-author');
const popupCard = document.querySelector('.p-card');
const profileForm = document.forms['profile-form'];
const nameInput = profileForm.elements.authorName;
const jobInput = profileForm.elements.authorPosition;
const authorNamePublished = document.querySelector('.author__name-text');
const authorJobPublished = document.querySelector('.author__position');
const closeButtons = document.querySelectorAll('.popup__close');


// Универсальный обработчик закрытия попапа по крестику

closeButtons.forEach((button) => {
    const popupToClose = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popupToClose));
});


// Открытие попапа редактирования профиля с подстановкой текущих значений

function fillProfileInputs() {
    nameInput.value = authorNamePublished.textContent;
    jobInput.value = authorJobPublished.textContent;
}

export function openPopupAuthor() {
  openPopup(popupAuthor);
  fillProfileInputs();
}


// Открытие попапа добавления карточки

export function openPopupCard() {
    openPopup(popupCard);
  }


// Отправка формы редактирования профиля автора

export function editAuthor (evt) {
    evt.preventDefault(); 
    authorNamePublished.textContent = nameInput.value;
    authorJobPublished.textContent = jobInput.value;
    hideClosestPopup(evt);
  }