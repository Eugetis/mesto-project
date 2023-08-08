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

  // метод для получения элемента
  _getElement() {
    const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.articles__item')
        .cloneNode(true);
        
    return cardElement;
  }

  // метод для создания карточки
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

  // метод для удаления карточки
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