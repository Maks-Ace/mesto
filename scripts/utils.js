import { popupOpen } from './index.js';

const popupPhotoFigure = document.querySelector(".popup__figure");
const popupPhoto = document.querySelector(".popup__figure-photo");
const popupPhotoCaption = document.querySelector(".popup__figure-caption");



// Функция отображает фотографию в попапе
export function showPhotoPopup(data) {
  popupPhotoCaption.textContent = data.name;
  popupPhoto.src = data.link;
  popupPhoto.alt = `фото - ${data.name}`;
  popupPhotoFigure.classList.add("popup__active-element");
  popupOpen();
}
