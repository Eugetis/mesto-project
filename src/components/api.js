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


  // запрос на обновление данных юзера на сервере
  // здесь колбек как аргумент???
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
  deleteCard(cardToDelete) {
    const cardToDeleteId = cardToDelete.getAttribute("data-id");
    return fetch(`${this._baseUrl}/cards/${cardToDeleteId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._validateServerResponse);
  }


// метод - запрос на поставить лайк карточки
  likeCard(cardToLike) {
    const cardToLikeId = cardToLike.getAttribute("data-id");
    return fetch(`${this._baseUrl}/cards/likes/${cardToLikeId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._validateServerResponse);
  }


// метод - запрос на удалить лайк карточки
  unlikeCard(cardToUnlike) {
    const cardToUnlikeId = cardToUnlike.getAttribute("data-id");
    return fetch(`${this._baseUrl}/cards/likes/${cardToUnlikeId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._validateServerResponse);
  }

}



// const config = {
//     baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
//     headers: {
//       authorization: '257608b2-435d-4812-89a7-aa07205ef2dd',
//       'Content-Type': 'application/json'
//     }
// }

// функция проверки, все ли ок с ответом сервера

// function validateServerResponse(res){
//     if(res.ok){
//       return res.json();
//     }
//     return Promise.reject(res.status);
//   };


// // запрос данных юзера с сервера

// export const getUserData = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'GET',
//     headers: config.headers
//   })
//     .then(validateServerResponse);
// }


// // запрос первичных карточек с сервера

// export const getInitialCards = () => {
//     return fetch(`${config.baseUrl}/cards`, {
//       method: 'GET',
//       headers: config.headers
//     })
//       .then(validateServerResponse);
// }


// // запрос на обновление данных юзера на сервере

// export const editAuthorData = (newUserData) => {
//     return fetch(`${config.baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: config.headers,
//       body: JSON.stringify({
//         name: newUserData.name,
//         about: newUserData.about
//       })
//     })
//       .then(validateServerResponse);
// }


// // запрос на обновление аватарки юзера 

// export const editAuthorAvatar = (newUserAvatar) => {
//     return fetch(`${config.baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: config.headers,
//       body: JSON.stringify({
//         avatar: newUserAvatar.link,
//       })
//     })
//       .then(validateServerResponse);
// }


// // запрос на отправку своей карточки на сервер

// export const postCustomCard = (cardToAdd) => {
//     return fetch(`${config.baseUrl}/cards`, {
//       method: 'POST',
//       headers: config.headers,
//       body: JSON.stringify({
//         name: cardToAdd.name,
//         link: cardToAdd.link
//       })
//     })
//       .then(validateServerResponse);
// }


// // запрос на удаление карточки

// export const deleteCard = (cardToDelete) => {
//     const cardToDeleteId = cardToDelete.getAttribute("data-id");
//     return fetch(`${config.baseUrl}/cards/${cardToDeleteId}`, {
//       method: 'DELETE',
//       headers: config.headers
//     })
//       .then(validateServerResponse);
// }


// // запрос на поставить лайк карточки

// export const likeCard = (cardToLike) => {
//     const cardToLikeId = cardToLike.getAttribute("data-id");
//     return fetch(`${config.baseUrl}/cards/likes/${cardToLikeId}`, {
//       method: 'PUT',
//       headers: config.headers
//     })
//       .then(validateServerResponse);
// }


// // запрос на удалить лайк карточки

// export const unlikeCard = (cardToUnlike) => {
//     const cardToUnlikeId = cardToUnlike.getAttribute("data-id");
//     return fetch(`${config.baseUrl}/cards/likes/${cardToUnlikeId}`, {
//       method: 'DELETE',
//       headers: config.headers
//     })
//       .then(validateServerResponse);
// }
  
