// лоадер на кнопки

export function renderLoading(isLoading, button) {
  if(isLoading) {
    button.innerText = 'Сохранение...';
  } else {
    setTimeout(function() {button.innerText = button.dataset.text}, 300);
  }
}