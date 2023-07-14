const popupAuthor = document.querySelector('.p-author');
const popupAuthorOpenBtn = document.querySelector('.author__name-edit');
const profileForm = document.forms['profile-form'];
const nameInput = profileForm.elements.authorName;
const jobInput = profileForm.elements.authorPosition;
const authorNamePublished = document.querySelector('.author__name-text');
const authorJobPublished = document.querySelector('.author__position');
const popupCard = document.querySelector('.p-card');
const popupCardOpenBtn = document.querySelector('.author__add');
const cardForm = document.forms['card-form'];
const cardToAdd = cardForm.querySelector('fieldset.popup__form-fields');
const cardNameInput = cardForm.elements.cardName;
const cardLinkInput = cardForm.elements.imgLink;
const popupPic = document.querySelector('.popup_type_pic');
const popupPicPicture = popupPic.querySelector('.popup__picture');
const popupPicCaption = popupPic.querySelector('.popup__caption');
const articlesGrid = document.querySelector('.articles__grid');
const closeButtons = document.querySelectorAll('.popup__close');


// Функционал валидации форм 

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__form-field_type-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-field-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-field_type-error');
  errorElement.classList.remove('popup__form-field-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-field'));
  const buttonElement = formElement.querySelector('.popup__form-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputList) => {
    return !inputList.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__form-button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__form-button_inactive');
  }
}

const enableValidation = () => {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();


// Функции открытия и закрытия попапов 

function openPopup(popup) {
    popup.classList.add('popup-opened');
    popup.addEventListener('click', closePopupByOverlayClick);
    document.addEventListener('keydown', closePopupByEscape);
}

function fillProfileInputs() {
    nameInput.value = authorNamePublished.textContent;
    jobInput.value = authorJobPublished.textContent;
}

function closePopup(popup) {
    popup.removeEventListener('click', closePopupByOverlayClick);
    document.removeEventListener('keydown', closePopupByEscape);
    popup.classList.remove('popup-opened');
}

function hideClosestPopup(evt) {
  const popupToClose = evt.target.closest('.popup');
  closePopup(popupToClose);
}

function closePopupByOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  };
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup-opened');
    closePopup(openedPopup);
  };
}


// Универсальный обработчик закрытия попапа по крестику

closeButtons.forEach((button) => {
    const popupToClose = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popupToClose));
});


// Открытие попапа редактирования профиля

popupAuthorOpenBtn.addEventListener('click', function () {
        openPopup(popupAuthor);
        fillProfileInputs();
    });


// Открытие попапа добавления карточки

popupCardOpenBtn.addEventListener('click', function () {
        openPopup(popupCard);
    });


// Отправка формы редактирования профиля

function editAuthor (evt) {
  evt.preventDefault(); 
  authorNamePublished.textContent = nameInput.value;
  authorJobPublished.textContent = jobInput.value;
  hideClosestPopup(evt);
}

profileForm.addEventListener('submit', editAuthor);


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

function prependCard (card) {
    articlesGrid.prepend(createCard(card));
}


// Автодобавление 6 карточек при загрузке страницы

const initialCards = [
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

initialCards.forEach(prependCard);


// Отправка формы добавления карточки

function addNewCard (evt) {
    evt.preventDefault(); 
    cardToAdd.name = cardNameInput.value;
    cardToAdd.link = cardLinkInput.value;
    prependCard(cardToAdd);
    evt.target.reset();
    hideClosestPopup(evt);
}

cardForm.addEventListener('submit', addNewCard);








