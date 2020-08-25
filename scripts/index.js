import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Объявление переменных
const popup = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const nameValue = document.querySelector(".profile__name");
const activityValue = document.querySelector(".profile__activity");

const profileForm = document.querySelector("#profile_form");
const profileFormLineOne = profileForm.querySelector(".popup__input_line-one");
const profileFormLineTwo = profileForm.querySelector(".popup__input_line-two");

const newPlaceForm = document.querySelector("#new_place_form");
const newPlaceFormLineOne = newPlaceForm.querySelector(".popup__input_line-one");
const newPlaceFormLineTwo = newPlaceForm.querySelector(".popup__input_line-two");

const elementsList = document.querySelector(".elements");

// Начальный массив карточек
const initialCards = [{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
},
{
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
},
{
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
},
{
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
},
{
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
},
{
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
},
];

// Глобальный объект с параметрами
export const paramObj = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//
// Объявление функций
//

// Функция закрыть попап
function popupClose(element) {
  document.removeEventListener("keydown", formCloseOnEscape);
  element.closest(".popup__active-element").classList.remove("popup__active-element");
  popup.classList.remove("popup_opened");
}


// Функция отображает попап с настройкой профиля
function showProfilePopup() {
  profileFormLineOne.value = nameValue.textContent;
  profileFormLineTwo.value = activityValue.textContent;
  profileForm.reset();
  profileFormLineOne.value = nameValue.textContent;
  profileFormLineTwo.value = activityValue.textContent;
  profileForm.classList.add("popup__active-element");
  popupOpen();
}

// Функция отобразить попап новая карточка
function showNewCardPopup() {
  // если не задать пустые строки, то при проверке для сброса кнопки submit после первого закрытия, она остается активной
  newPlaceFormLineOne.value = '';
  newPlaceFormLineTwo.value = '';
  newPlaceForm.reset();
  newPlaceForm.classList.add("popup__active-element");
  popupOpen();
}

function addCard(nameValue, linkValue) {
  const cardObj = new Card({ name: nameValue, link: linkValue }, '.card-template');
  elementsList.prepend(cardObj.generateCard());
}

function profileSubmitHandler(evt) {
  evt.preventDefault();
  nameValue.textContent = profileFormLineOne.value;
  activityValue.textContent = profileFormLineTwo.value;
  popupClose(evt.target);
}

function newCardSubmitHandler(evt) {
  evt.preventDefault();
  addCard(newPlaceFormLineOne.value, newPlaceFormLineTwo.value);
  popupClose(evt.target);
}

function closeButtonHandler(evt) {
  if (evt.target.classList.contains("popup__close-button")) {
    popupClose(evt.target);
  }
}

// Функция отобразить popup
export function popupOpen() {
  document.addEventListener("keydown", formCloseOnEscape);
  popup.classList.add("popup_opened");
}

// Функция закрытия формы по нажатию escape
function formCloseOnEscape(evt) {
  if (evt.key === "Escape") {
    const activeForm = document.querySelector(".popup__active-element");
    if (activeForm) {
      popupClose(activeForm);
    }
  }
}

function formCloseOnOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    popupClose(evt.target.querySelector(".popup__active-element"));
  }
}

//
// Обработка событий
//
profileEditButton.addEventListener("click", showProfilePopup);
cardAddButton.addEventListener("click", showNewCardPopup);
document.addEventListener("click", closeButtonHandler);
newPlaceForm.addEventListener("submit", newCardSubmitHandler);
profileForm.addEventListener("submit", profileSubmitHandler);
document.addEventListener("click", formCloseOnOverlay);

//
// При загрузке страницы заполнить стандартные карты
//
initialCards.forEach((cardData) => {
  addCard(cardData.name, cardData.link);
});

//
// Включение валидации при загрузке страницы
//
const formList = Array.from(document.querySelectorAll('.popup__container'));
formList.forEach(formElement => {
  const formClassElement = new FormValidator(paramObj, formElement);
  formClassElement.enableValidation();
})
