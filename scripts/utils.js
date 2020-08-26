const popup = document.querySelector(".popup");
const popupPhotoFigure = document.querySelector(".popup__figure");
const popupPhoto = document.querySelector(".popup__figure-photo");
const popupPhotoCaption = document.querySelector(".popup__figure-caption");


// Функция отобразить popup
export function popupOpen() {
  document.addEventListener("keydown", formCloseOnEscape);
  popup.classList.add("popup_opened");
}

export function formCloseOnEscape(evt) {
  if (evt.key === "Escape") {
    const activeForm = document.querySelector(".popup__active-element");
    if (activeForm) {
      popupClose(activeForm);
    }
  }
}

// Функция отображает фотографию в попапе
export function showPhotoPopup(data) {
  popupPhotoCaption.textContent = data.name;
  popupPhoto.src = data.link;
  popupPhoto.alt = `фото - ${data.name}`;
  popupPhotoFigure.classList.add("popup__active-element");
  popupOpen();
}
