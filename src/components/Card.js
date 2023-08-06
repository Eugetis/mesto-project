export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteClick }, selector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._selector = selector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getElement() {
    const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.articles__item')
        .cloneNode(true);
        
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._element.querySelector('.articles__title').textContent = this._name;
    this._element.querySelector('.articles__photo').src = this._link;
    this._element.querySelector('.articles__photo').alt = this._name;
    this._element.querySelector('.articles__likes-count').textContent = this._likes.length;

    const iconLike = this._element.querySelector('.articles__like');
    if (this._likes.some((obj) => {
      return obj._id ===  this._userId;
    })) {
      iconLike.classList.add('articles__like_active');
    }
    
    this._isLiked = iconLike.classList.contains('articles__like_active');

    iconLike.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    const iconDelete = this._element.querySelector('.articles__delete');
    if (this._owner._id !==  this._userId) {
      iconDelete.remove();
    } else {
      iconDelete.addEventListener('click', () => {
        this._handleDeleteClick(this._id);
      });
    }
    
    // вешаем слушатель клика для открытия попапа с картинкой
    this._element.querySelector('.articles__photo').addEventListener('click', () => { this._handleCardClick() });

    return this._element;
  }

  delete() {
    this._element.remove();
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(cardNewData) {
    this._element.querySelector('.articles__like').classList.add('articles__like_active');
    this._element.querySelector('.articles__likes-count').textContent = cardNewData.likes.length;
    this._isLiked = true;
  }

  unsetLike(cardNewData) {
    this._element.querySelector('.articles__like').classList.remove('articles__like_active');
    this._element.querySelector('.articles__likes-count').textContent = cardNewData.likes.length;
    this._isLiked = false;
  }
}



// import { openPopup } from './modal.js';
// import { popupPic, popupPicPicture, popupPicCaption, articleTemplate } from './index.js';
// import { deleteCard, likeCard, unlikeCard } from './Api.js';


// // Функция создания карточки

// export function createCard(card, user) {
//     //const articleElement = articleTemplate.querySelector('.articles__item').cloneNode(true);
//     //const articleTitle = articleElement.querySelector('.articles__title');
//     //const articlePhoto = articleElement.querySelector('.articles__photo');
//     //const articleLikes = articleElement.querySelector('.articles__likes-count');
//     //articleTitle.textContent = card.name;
//     //articlePhoto.src = card.link;
//     //articlePhoto.alt = card.name;
//     //articleLikes.textContent = card.likes.length;
//     articleElement.setAttribute("data-id", card._id);
//     articleElement.setAttribute("data-owner-id", card.owner._id);

//     // функционал лайка
//     // const iconLike = articleElement.querySelector('.articles__like');
//     // if (card.likes.some((obj) => {
//     //   return obj._id === user;
//     // })) {
//     //   iconLike.classList.add('articles__like_active');
//     // }
//     iconLike.addEventListener('click', function() {
//       if (!iconLike.classList.contains('articles__like_active')) {
//         likeCard(articleElement)
//         .then((cardNewData) => {
//           iconLike.classList.add('articles__like_active');
//           articleLikes.textContent = cardNewData.likes.length;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       } else {
//         unlikeCard(articleElement)
//         .then((cardNewData) => {
//           iconLike.classList.remove('articles__like_active');
//           articleLikes.textContent = cardNewData.likes.length;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       }
//     });

//     // функционал удаления
//     const iconDelete = articleElement.querySelector('.articles__delete');
//     if (card.owner._id !== user) {
//       iconDelete.remove();
//     } else {
//       iconDelete.addEventListener('click', function() {
//         deleteCard(articleElement)
//         .then(() => {
//           articleElement.remove();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       });
//     }

//     articlePhoto.addEventListener('click', function() {
//       openPopup(popupPic);
//       popupPicPicture.src = articlePhoto.src;
//       popupPicPicture.alt = articleTitle.textContent;
//       popupPicCaption.textContent = articleTitle.textContent;
//     });
    
//     return articleElement;
// };