const popupAuthor = document.querySelector('.p-author');
const popupAuthorOpenBtn = document.querySelector('.author__name-edit');
const popupAuthorCloseBtn = popupAuthor.querySelector('.popup__close');
const formAuthor = popupAuthor.querySelector('.popup__form');

const nameInput = formAuthor.querySelector('fieldset.popup__form-fields input[name=author-name]');
const jobInput = formAuthor.querySelector('fieldset.popup__form-fields input[name=author-position]');
const authorNamePublished = document.querySelector('.author__name-text');
const authorJobPublished = document.querySelector('.author__position');

const popupCard = document.querySelector('.p-card');
const popupCardOpenBtn = document.querySelector('.author__add');
const popupCardCloseBtn = popupCard.querySelector('.popup__close');
const formCard = popupCard.querySelector('.popup__form');

const popupPic = document.querySelector('.popup_type_pic');
const popupPicCloseBtn = popupPic.querySelector('.popup__close');
const popupPicPicture = popupPic.querySelector('.popup__picture');
const popupPicCaption = popupPic.querySelector('.popup__caption');

const articlesGrid = document.querySelector('.articles__grid');


// Коллбеки открытия и закрытия попапов 

function openPopup(popupName) {
    const popupToOpen = popupName;
    popupToOpen.classList.add('popup-opened');
}

function placeAuthorNameAndJob() {
    nameInput.value = authorNamePublished.textContent;
    jobInput.value = authorJobPublished.textContent;
}

function closePopup(evt) {
    const popupToClose = evt.target.closest('.popup');
    popupToClose.classList.remove('popup-opened');
}


// Открытие попапа редактирования профиля

popupAuthorOpenBtn.addEventListener('click', function () {
        openPopup(popupAuthor);
        placeAuthorNameAndJob();
    });


// Закрытие попапа редактирования профиля

popupAuthorCloseBtn.addEventListener('click', closePopup);


// Открытие попапа добавления карточки

popupCardOpenBtn.addEventListener('click', function () {
        openPopup(popupCard);
    });


// Закрытие попапа добавления карточки

popupPicCloseBtn.addEventListener('click', closePopup);


// Закрытие попапа просмотра фото

popupCardCloseBtn.addEventListener('click', closePopup);


// Отправка формы редактирования профиля

function editAuthor (evt) {
  evt.preventDefault(); 
  authorNamePublished.textContent = nameInput.value;
  authorJobPublished.textContent = jobInput.value;
  closePopup(evt);
}

formAuthor.addEventListener('submit', editAuthor);


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
      popupPicCaption.textContent = articleTitle.textContent;
    });

    return articleElement;
};


// Функция добавления карточки в начало списка

function prepandCard (card) {
    const articleToPlace = createCard(card)
    articlesGrid.prepend(articleToPlace);
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

initialCards.forEach(prepandCard);


// Отправка формы добавления карточки

function addNewCard (evt) {
    evt.preventDefault(); 
    const cardToAdd = formCard.querySelector('fieldset.popup__form-fields');
    const cardNameInput = formCard.querySelector('fieldset.popup__form-fields input[name=card-name]');
    const cardLinkInput = formCard.querySelector('fieldset.popup__form-fields input[name=img-link]');
    cardToAdd.name = cardNameInput.value;
    cardToAdd.link = cardLinkInput.value;
    prepandCard(cardToAdd);
    cardLinkInput.value = '';
    cardNameInput.value = '';
    closePopup(evt);
}

formCard.addEventListener('submit', addNewCard);