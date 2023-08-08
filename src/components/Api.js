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

  // метод запроса к серверу по заданному url с необходимыми параметрами
  _request(url, options) {
    return fetch(url, options).then(this._validateServerResponse);
  }

  // метод - запрос данных юзера с сервера
  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  // метод - запрос первичных карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  // метод - запрос на обновление данных юзера на сервере
  editAuthorData(newUserData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about
      })
    })
  }
  
  // метод - запрос на обновление аватарки юзера 
  editAuthorAvatar(newUserAvatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newUserAvatar.link,
      })
    })
  }

  // метод - запрос на отправку своей карточки на сервер
  postCustomCard(cardToAdd) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardToAdd.name,
        link: cardToAdd.link
      })
    })
  }

  // метод - запрос на удаление карточки
  deleteCard(cardToDeleteId) {
    return this._request(`${this._baseUrl}/cards/${cardToDeleteId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // метод - запрос на поставить лайк карточки
  likeCard(cardToLikeId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardToLikeId}`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  // метод - запрос на удалить лайк карточки
  unlikeCard(cardToUnlikeId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardToUnlikeId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

}