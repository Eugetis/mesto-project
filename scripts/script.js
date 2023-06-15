// Глобальные переменные

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

const articlesGrid = document.querySelector('.articles__grid');
const articleTemplate = document.querySelector('#article').content;

const cardNameInput = formCard.querySelector('fieldset.popup__form-fields input[name=card-name]');
const cardLinkInput = formCard.querySelector('fieldset.popup__form-fields input[name=img-link]');

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
        cardLinkInput.value = '';
        cardNameInput.value = '';
    });


// Закрытие попапа добавления карточки

popupCardCloseBtn.addEventListener('click', closePopup);


// Отправка формы редактирования профиля

function editAuthor (evt) {
  evt.preventDefault(); 
  authorNamePublished.textContent = nameInput.value;
  authorJobPublished.textContent = jobInput.value;
  closePopup(evt);
}

formAuthor.addEventListener('submit', editAuthor);


// Функция добавления карточки

function addCard (card) {
    const articleElement = articleTemplate.querySelector('.articles__item').cloneNode(true);
    articleElement.querySelector('.articles__title').textContent = card.name;
    articleElement.querySelector('.articles__photo').src = card.link;
    articleElement.querySelector('.articles__photo').alt = card.name;
    articlesGrid.prepend(articleElement);
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

initialCards.forEach(addCard);


// Отправка формы добавления карточки

function sendCard (evt) {
    evt.preventDefault(); 
    const card = formCard.querySelector('fieldset.popup__form-fields');
    card.name = cardNameInput.value;
    card.link = cardLinkInput.value;
    addCard(card);
    closePopup(evt);
  }

formCard.addEventListener('submit', sendCard);


// Лайк карточки

const like = articlesGrid.querySelectorAll('.articles__item .articles__like');

like.forEach(function(item) {
    item.addEventListener('click', function() {
        item.classList.toggle('articles__like_active');
    });
});


// Удаление карточки

const cardDeleteBtn = articlesGrid.querySelectorAll('.articles__item .articles__delete');

cardDeleteBtn.forEach(function(item) {
    item.addEventListener('click', function() {
        const cardToDelete = item.closest('.articles__item');
        cardToDelete.remove();
    });
});


// Открытие и закрытие попапа с картинкой

const popupPic = document.querySelector('.popup_type_pic');
const popupPicClose = popupPic.querySelector('.popup__close');
const popupPicPicture = popupPic.querySelector('.popup__picture');
const popupPicCaption = popupPic.querySelector('.popup__caption');
const photo = articlesGrid.querySelectorAll('.articles__item .articles__photo');

photo.forEach(function(item) {
    item.addEventListener('click', function () {
        openPopup(popupPic);
        popupPicPicture.src = item.closest('.articles__item').querySelector('.articles__photo').src;
        popupPicCaption.textContent = item.closest('.articles__item').querySelector('.articles__title').textContent;
    });
});

popupPicClose.addEventListener('click', function (evt) {
    const popupPicToClose = evt.target.closest('.popup_type_pic');
    popupPicToClose.classList.remove('popup-opened');
});

