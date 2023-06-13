const popupProfile = document.querySelector('.popup');
const buttonEdit = document.querySelector('.author__name-edit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('fieldset.popup__form-fields input[name=author-name]');
const jobInput = formElement.querySelector('fieldset.popup__form-fields input[name=author-position]');
const authorNamePublished = document.querySelector('.author__name-text');
const authorJobPublished = document.querySelector('.author__position');
const buttonCross = document.querySelector('.popup__close');


// открытие и закрытие попапа редактирования профиля

buttonEdit.addEventListener('click', function() {
  popupProfile.classList.add('popup_opened');
  nameInput.value = authorNamePublished.textContent;
  jobInput.value = authorJobPublished.textContent;
});

buttonCross.addEventListener('click', ()=> {
  popupProfile.classList.remove('popup_opened');
});


// Отправка формы

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  authorNamePublished.textContent = nameInput.value;
  authorJobPublished.textContent = jobInput.value;
  popupProfile.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

