import { openPopup, hideClosestPopup } from './utils.js';

const popupPic = document.querySelector('.popup_type_pic');
const popupPicPicture = popupPic.querySelector('.popup__picture');
const popupPicCaption = popupPic.querySelector('.popup__caption');
const cardForm = document.forms['card-form'];
const cardToAdd = cardForm.querySelector('fieldset.popup__form-fields');
const cardNameInput = cardForm.elements.cardName;
const cardLinkInput = cardForm.elements.imgLink;
const articlesGrid = document.querySelector('.articles__grid');



// Функция создания карточки

function createCard (card) {
    const articleTemplate = document.querySelector('#article').content;
    const articleElement = articleTemplate.querySelector('.articles__item').cloneNode(true);
    const articleTitle = articleElement.querySelector('.articles__title');
    const articlePhoto = articleElement.querySelector('.articles__photo');
    articleTitle.textContent = card.name;
    articlePhoto.src = card.link;
    articlePhoto.alt = card.name;

    const likeIcon = articleElement.querySelector('.articles__like');
    likeIcon.addEventListener('click', () => likeIcon.classList.toggle('articles__like_active'));

    const deleteIcon = articleElement.querySelector('.articles__delete');
    deleteIcon.addEventListener('click', () => articleElement.remove());
    
    articlePhoto.addEventListener('click', function () {
      openPopup(popupPic);
      popupPicPicture.src = articlePhoto.src;
      popupPicPicture.alt = articleTitle.textContent;
      popupPicCaption.textContent = articleTitle.textContent;
    });

    return articleElement;
};


// Функция добавления карточки в начало списка

export function prependCard (card) {
    articlesGrid.prepend(createCard(card));
}


// Автодобавление 6 карточек при загрузке страницы

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];


// Отправка формы добавления карточки

export function addNewCard (evt) {
    evt.preventDefault(); 
    cardToAdd.name = cardNameInput.value;
    cardToAdd.link = cardLinkInput.value;
    prependCard(cardToAdd);
    evt.target.reset();
    hideClosestPopup(evt);
}

