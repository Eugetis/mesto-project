import { openPopup } from './modal.js';
import { popupPic, popupPicPicture, popupPicCaption, articleTemplate } from './index.js';
import { deleteCard, likeCard, unlikeCard } from './api.js';


// Функция создания карточки

export function createCard(card, user) {
    const articleElement = articleTemplate.querySelector('.articles__item').cloneNode(true);
    const articleTitle = articleElement.querySelector('.articles__title');
    const articlePhoto = articleElement.querySelector('.articles__photo');
    const articleLikes = articleElement.querySelector('.articles__likes-count');
    articleTitle.textContent = card.name;
    articlePhoto.src = card.link;
    articlePhoto.alt = card.name;
    articleLikes.textContent = card.likes.length;
    articleElement.setAttribute("data-id", card._id);
    articleElement.setAttribute("data-owner-id", card.owner._id);

    // функционал лайка
    const iconLike = articleElement.querySelector('.articles__like');
    if (card.likes.some((obj) => {
      return obj._id === user;
    })) {
      iconLike.classList.add('articles__like_active');
    }
    iconLike.addEventListener('click', function() {
      if (!iconLike.classList.contains('articles__like_active')) {
        likeCard(articleElement)
        .then((cardNewData) => {
          iconLike.classList.add('articles__like_active');
          articleLikes.textContent = cardNewData.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        unlikeCard(articleElement)
        .then((cardNewData) => {
          iconLike.classList.remove('articles__like_active');
          articleLikes.textContent = cardNewData.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
      }
    });

    // функционал удаления
    const iconDelete = articleElement.querySelector('.articles__delete');
    if (card.owner._id !== user) {
      iconDelete.remove();
    } else {
      iconDelete.addEventListener('click', function() {
        deleteCard(articleElement)
        .then(() => {
          articleElement.remove();
        })
        .catch((err) => {
          console.log(err);
        });
      });
    }

    articlePhoto.addEventListener('click', function() {
      openPopup(popupPic);
      popupPicPicture.src = articlePhoto.src;
      popupPicPicture.alt = articleTitle.textContent;
      popupPicCaption.textContent = articleTitle.textContent;
    });
    
    return articleElement;
};