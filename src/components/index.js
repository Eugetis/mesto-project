import Api from './Api.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { 
  settings,
  cardListSelector,
  articleTemplateSelector,
  popupForImageSelector,
  authorNameSelector, 
  authorJobSelector, 
  authorAvatarSelector,
  popupAuthorSelector,
  popupCardSelector,
  popupAvatarSelector
  // popupAuthor, 
  // popupCard, 
  // popupAvatar
} from '../utils/constants.js';

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '257608b2-435d-4812-89a7-aa07205ef2dd',
    'Content-Type': 'application/json'
  }
});




import '../pages/style.css';
// import { enableValidation } from './validate.js';
// import { createCard } from './Card.js';
import { openPopupAuthor, openPopupCard, openPopupAvatar, closePopup } from './modal.js';
import { getUserData, getInitialCards, postCustomCard, editAuthorData, editAuthorAvatar } from './Api.js';
import { renderLoading } from './utils';
import { data } from 'autoprefixer';

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
// const articlesGrid = document.querySelector('.articles__grid');  // перенес в constants.js
const popupAvatarOpenBtn = document.querySelector('.author__avatar-edit');
const avatarForm = document.forms['avatar-form'];
const newUserAvatar = avatarForm.querySelector('fieldset.popup__form-fields');
const avatarSubmitButton = avatarForm.querySelector('.popup__form-button');

//  export const articleTemplate = document.querySelector('#article').content;
// export const popupPic = document.querySelector('.popup_type_pic');
// export const popupPicPicture = popupPic.querySelector('.popup__picture');
// export const popupPicCaption = popupPic.querySelector('.popup__caption');
export const popupAuthor = document.querySelector('.p-author'); // ЗАКОММЕНТИТЬ // перенес в constants.js
export const popupCard = document.querySelector('.p-card'); // ЗАКОММЕНТИТЬ // перенес в constants.js
//export const popupAvatar = document.querySelector('.p-avatar'); // ЗАКОММЕНТИТЬ // перенес в constants.js
export const nameInput = profileForm.elements.authorName;
export const jobInput = profileForm.elements.authorPosition;
export const authorNamePublished = document.querySelector('.author__name-text');
export const authorJobPublished = document.querySelector('.author__position');

let userId = '';
const authorAvatar = document.querySelector('.author__avatar');
const avatarInput = avatarForm.elements.avatarLink;




// Получение и обработка первичных данных с сервера

function getInitialData() {
  Promise.all([api.getUserData(), api.getInitialCards()])
    .then((res) => {
      const userData = res[0];
      const initialCards = res[1];
      userId = userData._id;
      //renderUser(userData);
      userInfo.setUserInfo(userData);
      // renderInitialCards(initialCards);
      cardList.renderItems(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
};
getInitialData();


// рендер стартовых данных юзера с сервера

// const renderUser = (user) => {
//   authorNamePublished.textContent = user.name;
//   authorJobPublished.textContent = user.about;
//   authorAvatar.src = user.avatar;
// }

const userInfo = new UserInfo({
  selectorName: authorNameSelector,
  selectorJob: authorJobSelector,
  selectorAvatar: authorAvatarSelector
});

// рендер первичных карточек с сервера

// const renderInitialCards = function(cards, user) {
//   cards.forEach((cardData) => {
//     const card = new Card(cardData, '.article');
//     const cardElement = card.generate(user);
//     articlesGrid.append(cardElement);
//   });
// }

const popupWithImage = new PopupWithImage(popupForImageSelector);
popupWithImage.setEventListeners();

const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open({link: item.link, name: item.name});
    },
    handleLikeClick: (id) => {
      if (!card.isLiked()) {
        api.likeCard(id)
        .then((res) => {
          card.setLike(res);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        api.unlikeCard(id)
        .then((res) => {
          card.unsetLike(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
    handleDeleteClick: (id) => {
      api.deleteCard(id)
        .then(() => {
          card.delete();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, articleTemplateSelector, userId);
  const cardElement = card.generate();
  return cardElement;
}

const cardList = new Section({
  items: [],
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardListSelector);

// const renderInitialCards = function(cards) {
//   const cardList = new Section({
//     data: cards,
//     renderer: (cardData, userId) => {
//       const card = new Card({ 
//         data: cardData, 
//         handleClick: () => { // написал обработчик, который нужно повесить на клик по картинке при создании карточки
//           const popupWithImage = new PopupWithImage(cardData, popupForImageSelector);
//           popupWithImage.open();
//         }
//       }, '.article', userId);
//       const cardElement = card.generate();
//       cardList.setItem(cardElement);
//     }
//   }, cardListSelector, userId);

//   cardList.renderItems();
// }

/***************************************************************************/

/* УДАЛИТЬ КОГДА ГОТОВ ВАЛИДАТОР */
// Вызов установщика валидатора на все формы на странице 
// enableValidation(settings);


const editFormValidator = new FormValidator(settings, profileForm);
const cardFormValidator = new FormValidator(settings, cardForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


// Установка слушателей открытия попапов

// УДАЛИТЬ
// popupAuthorOpenBtn.addEventListener('click', openPopupAuthor);
// РАЗРЕМАРИТЬ по готовности попапа
popupAuthorOpenBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupEditAuthor.open();
  editFormValidator.resetErrors(); // СБРОС ОШИБОК ФОРМЫ В ВАЛИДАТОРЕ
});


// УДАЛИТЬ
//popupCardOpenBtn.addEventListener('click', openPopupCard);
// РАЗРЕМАРИТЬ по готовности попапа
popupCardOpenBtn.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidator.resetErrors();
});

// УДАЛИТЬ
//popupAvatarOpenBtn.addEventListener('click', openPopupAvatar);
// РАЗРЕМАРИТЬ по готовности попапа
popupAvatarOpenBtn.addEventListener('click', () => {
  popupAvatar.open();
  avatarFormValidator.resetErrors();
});

// // Отправка формы добавления новой карточки с ее последующим рендером
// // УДАЛИТЬ
// function addNewCard(evt) {
//   evt.preventDefault(); 
//   renderLoading(true, cardSubmitButton);
//   cardToAdd.name = cardNameInput.value;
//   cardToAdd.link = cardLinkInput.value;
//   api.postCustomCard(cardToAdd)
//     .then((cardData) => {
//       //prependCard(newCard, newCard.owner._id);
//       cardList.addItem(createCard(cardData));
//       evt.target.reset();
//       closePopup(evt.target.closest('.popup'));
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(false, cardSubmitButton);
//     });
// }

// ВМЕСТО addNewCard  
const popupAddCard = new PopupWithForm(popupCardSelector, (inputValues) => {
  popupAddCard.renderLoading(true);
  cardToAdd.name = inputValues.cardName;
  cardToAdd.link = inputValues.imgLink;
  api.postCustomCard(cardToAdd)
    .then((cardData) => {
      cardList.addItem(createCard(cardData));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    })
});

// Функция добавления карточки в начало списка

// function prependCard(cardData, user) {
//   const card = new Card(cardData, '.article', user);
//   const cardElement = card.generate();
//   document.querySelector(cardListSelector).prepend(cardElement);
// }


// Установка слушателя отправки формы добавления новой карточки
// УДАЛИТЬ
//cardForm.addEventListener('submit', addNewCard);
// ВМЕСТО слушателя addNewCard
popupAddCard.setEventListeners();

// Отправка формы редактирования профиля автора
// // УДАЛИТЬ
// function editAuthor(evt) {
//   evt.preventDefault(); 
//   renderLoading(true, profileSubmitButton);
//   newUserData.name = nameInput.value;
//   newUserData.about = jobInput.value;
//   api.editAuthorData(newUserData)
//     .then((updatedData) => {
//       authorNamePublished.textContent = updatedData.name;
//       authorJobPublished.textContent = updatedData.about;
//       closePopup(evt.target.closest('.popup'));
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(false, profileSubmitButton);
//     });
// }

// ВМЕСТО editAuthor  
const popupEditAuthor = new PopupWithForm(popupAuthorSelector, (inputValues) => {
  popupEditAuthor.renderLoading(true);
  newUserData.name = inputValues.authorName;
  newUserData.about = inputValues.authorPosition;
  api.editAuthorData(newUserData)
    .then((updatedData) => {
      userInfo.setUserInfo(updatedData);
      popupEditAuthor.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAuthor.renderLoading(false);
    })
});

// Установка слушателя отправки формы редактирования профиля
// // УДАЛИТЬ
// profileForm.addEventListener('submit', editAuthor);
// ВМЕСТО слушателя editAuthor
popupEditAuthor.setEventListeners();

// Отправка формы обновления аватара
// // УДАЛИТЬ
// function editAvatar(evt) {
//   evt.preventDefault(); 
//   renderLoading(true, avatarSubmitButton);
//   newUserAvatar.link = avatarInput.value;
//   api.editAuthorAvatar(newUserAvatar)
//     .then((updatedData) => {
//       authorAvatar.src = updatedData.avatar;
//       evt.target.reset();
//       closePopup(evt.target.closest('.popup'));
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(false, avatarSubmitButton);
//     });
// }

// ВМЕСТО editAvatar  
const popupAvatar = new PopupWithForm(popupAvatarSelector,  (inputValues) => {
  popupAvatar.renderLoading(true);
  newUserAvatar.link = inputValues.avatarLink;
  api.editAuthorAvatar(newUserAvatar)
      .then((updatedData) => {
        userInfo.setUserInfo(updatedData);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  }
);

// Установка слушателя отправки формы редактирования профиля
// УДАЛИТЬ
// avatarForm.addEventListener('submit', editAvatar);
// ВМЕСТО слушателя avatarForm
popupAvatar.setEventListeners();
