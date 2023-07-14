// полный функционал открытия попапа с навешиванием слушателей

export function openPopup(popup) {
    popup.classList.add('popup-opened');
    popup.addEventListener('click', closePopupByOverlayClick);
    document.addEventListener('keydown', closePopupByEscape);
}


// полный функицонал закрытия попапа с удалением слушателей

export function closePopup(popup) {
    popup.removeEventListener('click', closePopupByOverlayClick);
    document.removeEventListener('keydown', closePopupByEscape);
    popup.classList.remove('popup-opened');
}


// закрытие ближайшего к событию попапа

export function hideClosestPopup(evt) {
  const popupToClose = evt.target.closest('.popup');
  closePopup(popupToClose);
}


// закрытие попапа по клику на оверлей

export function closePopupByOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  };
}


// закрытие попапа по нажатию на Esc

export function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup-opened');
    closePopup(openedPopup);
  };
}