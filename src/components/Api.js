export default class Api {

  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // метод проверки, все ли ок с ответом сервера
  _validateServerResponse(res){
    if(res.ok){
      return res.json();
    }
    return Promise.reject(res.status);
  };

  // метод - запрос данных юзера с сервера
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._validateServerResponse);
  }

  // метод - запрос первичных карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._validateServerResponse);
  }

  // метод - запрос на обновление данных юзера на сервере
  editAuthorData(newUserData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about
      })
    })
      .then(this._validateServerResponse);
  }
  
  // метод - запрос на обновление аватарки юзера 
  editAuthorAvatar(newUserAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newUserAvatar.link,
      })
    })
      .then(this._validateServerResponse);
  }

  // метод - запрос на отправку своей карточки на сервер
  postCustomCard(cardToAdd) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardToAdd.name,
        link: cardToAdd.link
      })
    })
      .then(this._validateServerResponse);
  }

  // метод - запрос на удаление карточки
  deleteCard(cardToDeleteId) {
    return fetch(`${this._baseUrl}/cards/${cardToDeleteId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._validateServerResponse);
  }

  // метод - запрос на поставить лайк карточки
  likeCard(cardToLikeId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardToLikeId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._validateServerResponse);
  }

  // метод - запрос на удалить лайк карточки
  unlikeCard(cardToUnlikeId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardToUnlikeId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._validateServerResponse);
  }

}