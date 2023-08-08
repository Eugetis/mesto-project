import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
  popupAvatarSelector,
  popupAuthorOpenBtn,
  profileForm,
  newUserData,
  popupCardOpenBtn,
  cardForm,
  cardToAdd,
  popupAvatarOpenBtn,
  avatarForm,
  newUserAvatar,
  nameInput,
  jobInput
} from '../utils/constants.js';

import './style.css';




// Инстанцирование Api с объектом настроек (url и заголовки)

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '257608b2-435d-4812-89a7-aa07205ef2dd',
    'Content-Type': 'application/json'
  }
});


// Получение и обработка первичных данных с сервера

let userId = ''

function getInitialData() {
  Promise.all([api.getUserData(), api.getInitialCards()])
    .then((res) => {
      const userData = res[0];
      const initialCards = res[1];
      userId = userData._id;
      userInfo.setUserInfo(userData);
      cardList.renderItems(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
};

getInitialData();


// рендер стартовых данных юзера с сервера

const userInfo = new UserInfo({
  selectorName: authorNameSelector,
  selectorJob: authorJobSelector,
  selectorAvatar: authorAvatarSelector
});


// рендер первичных карточек с сервера

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


// Инстанцирование секции для карточек

const cardList = new Section({
  items: [],
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, cardListSelector);


// Установка валидаторов для форм редактирования автора, добавления карточки, редактирования аватарки

const editFormValidator = new FormValidator(settings, profileForm);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(settings, cardForm);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, avatarForm);
avatarFormValidator.enableValidation();


// Установка слушателей открытия попапов

popupAuthorOpenBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupEditAuthor.open();
  editFormValidator.resetErrors();
});

popupCardOpenBtn.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidator.resetErrors();
});

popupAvatarOpenBtn.addEventListener('click', () => {
  popupAvatar.open();
  avatarFormValidator.resetErrors();
});


// Добавление новой карточки  

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

popupAddCard.setEventListeners();


// Редактирование данных автора  

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

popupEditAuthor.setEventListeners();


// Редактирование аватара автора

const popupAvatar = new PopupWithForm(popupAvatarSelector, (inputValues) => {
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

popupAvatar.setEventListeners();
