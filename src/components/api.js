import { validateServerResponse } from './utils.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
      authorization: '257608b2-435d-4812-89a7-aa07205ef2dd',
      'Content-Type': 'application/json'
    }
}


// запрос данных юзера с сервера

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(validateServerResponse);
}


// запрос первичных карточек с сервера

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
      .then(validateServerResponse);
}


// запрос на обновление данных юзера на сервере

export const editAuthorData = (newUserData) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about
      })
    })
      .then(validateServerResponse);
}


// запрос на обновление аватарки юзера 

export const editAuthorAvatar = (newUserAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: newUserAvatar.link,
      })
    })
      .then(validateServerResponse);
}


// запрос на отправку своей карточки на сервер

export const postCustomCard = (cardToAdd) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: cardToAdd.name,
        link: cardToAdd.link
      })
    })
      .then(validateServerResponse);
}


// запрос на удаление карточки

export const deleteCard = (cardToDelete) => {
    const cardToDeleteId = cardToDelete.getAttribute("data-id");
    return fetch(`${config.baseUrl}/cards/${cardToDeleteId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(validateServerResponse);
}


// запрос на поставить лайк карточки

export const likeCard = (cardToLike) => {
    const cardToLikeId = cardToLike.getAttribute("data-id");
    return fetch(`${config.baseUrl}/cards/likes/${cardToLikeId}`, {
      method: 'PUT',
      headers: config.headers
    })
      .then(validateServerResponse);
}


// запрос на удалить лайк карточки

export const unlikeCard = (cardToUnlike) => {
    const cardToUnlikeId = cardToUnlike.getAttribute("data-id");
    return fetch(`${config.baseUrl}/cards/likes/${cardToUnlikeId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(validateServerResponse);
}
  
