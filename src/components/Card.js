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
    this._title = this._element.querySelector('.articles__title');
    this._cardImage = this._element.querySelector('.articles__photo');
    this._likeButton = this._element.querySelector('.articles__like');
    this._likeCount = this._element.querySelector('.articles__likes-count');
    this._deleteButton = this._element.querySelector('.articles__delete');
    this._title.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount.textContent = this._likes.length;

    if (this._likes.some((obj) => {
      return obj._id ===  this._userId;
    })) {
      this._likeButton.classList.add('articles__like_active');
    }
    
    this._isLiked = this._likeButton.classList.contains('articles__like_active');

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    if (this._owner._id !==  this._userId) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this._id);
      });
    }
    
    // вешаем слушатель клика для открытия попапа с картинкой
    this._cardImage.addEventListener('click', () => { this._handleCardClick() });

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
    this._likeButton.classList.add('articles__like_active');
    this._likeCount.textContent = cardNewData.likes.length;
    this._isLiked = true;
  }

  unsetLike(cardNewData) {
    this._likeButton.classList.remove('articles__like_active');
    this._likeCount.textContent = cardNewData.likes.length;
    this._isLiked = false;
  }

}