import { openPopup } from './modal.js';
import { popupPic, popupPicPicture, popupPicCaption, articleTemplate } from './index.js';


// Функция создания карточки

export function createCard (card) {
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

