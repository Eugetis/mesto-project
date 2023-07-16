// функция проверки, все ли ок с ответом сервера

export function validateServerResponse(res){
  if(res.ok){
    return res.json();
  }
  return Promise.reject(res.status);
};


// лоадер на кнопки

export function renderLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}