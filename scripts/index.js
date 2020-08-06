
// Объявление переменных
const popup = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector('.profile__add-button');
const nameValue = document.querySelector('.profile__name');
const activityValue = document.querySelector('.profile__activity');

const popupPhotoFigure = document.querySelector('.popup__figure')
const popupPhoto = document.querySelector('.popup__figure-photo');
const popupPhotoCaption = document.querySelector('.popup__figure-caption')

const profileForm = document.querySelector('#profile_form');
const profileFormLineOne = profileForm.querySelector('.popup__input_line-one');
const profileFormLineTwo = profileForm.querySelector('.popup__input_line-two');

const newPlaceForm = document.querySelector('#new_place_form');
const newPlaceFormLineOne = newPlaceForm.querySelector('.popup__input_line-one');
const newPlaceFormLineTwo = newPlaceForm.querySelector('.popup__input_line-two');

const cardTemplate = document.querySelector("#card-template");
const elementsList = document.querySelector('.elements');

// Начальный массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//
// Объявление функций
//

// Функция отобразить popup
function popupOpen() {
  document.addEventListener('keydown', formCloseOnEscape);
  popup.classList.add('popup_opened');
}

// Функция закрыть попап
function popupClose(element) {
  document.removeEventListener('keydown', formCloseOnEscape);
  element.closest('.popup__active-element').classList.remove('popup__active-element');
  popup.classList.remove('popup_opened');
}

// Функция отображает фотографию в попапе
function showPhotoPopup(data) {
  popupPhotoCaption.textContent = data.name;
  popupPhoto.src = data.link;
  popupPhoto.alt = `фото - ${data.name}`;
  popupPhotoFigure.classList.add('popup__active-element');
  popupOpen();
}

// Функция отображает попап с настройкой профиля
function showProfilePopup() {
  const inputList = profileForm.querySelectorAll('.popup__input');
  profileFormLineOne.value = nameValue.textContent;
  profileFormLineTwo.value = activityValue.textContent;
  prepareForm(profileForm);
  profileForm.classList.add('popup__active-element');
  popupOpen();
}

// Функция отобразить попап новая карточка
function showNewCardPopup() {
  newPlaceFormLineOne.value = '';
  newPlaceFormLineTwo.value = '';
  prepareForm(newPlaceForm);
  newPlaceForm.classList.add('popup__active-element');
  popupOpen();
}

function prepareForm(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const errorList = Array.from(formElement.querySelectorAll('.popup__input-error'));
  const submitButton = formElement.querySelector('.popup__submit-button');

  toggleSubmitButtonState(inputList, submitButton, paramObj.inactiveButtonClass);

  inputList.forEach(inputElement => {
    inputElement.classList.remove(paramObj.inputErrorClass);
  })

  errorList.forEach((error) => {
    error.textContent = "";
    error.classList.remove(paramObj.errorClass);
  });

}


// Функция работы с карточкой
function getCardElement(data) {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardName = newCard.querySelector('.element__title');
  const likeButton = newCard.querySelector('.element__like-button');
  const deleteButton = newCard.querySelector('.element__delete-button');
  const cardImage = newCard.querySelector('.element__image');

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = `фото - ${data.name}`;

  likeButton.addEventListener('click', likeCardAction);
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => { showPhotoPopup({ name: cardName.textContent, link: cardImage.src }) })

  return newCard;
}

function addCard(nameValue, linkValue) {
  const card = getCardElement({ name: nameValue, link: linkValue });
  elementsList.prepend(card);
}

// Функция удаления карточки
function deleteCard(event) {
  if (event.target.classList.contains('element__delete-button')) {
    event.target.closest('.element').remove();
  }
}

// Функция лайка
function likeCardAction(evt) {
  evt.target.classList.toggle('element__like-button_liked');
}

function profileSubmitHandler(evt) {
  evt.preventDefault();
  nameValue.textContent = profileFormLineOne.value;
  activityValue.textContent = profileFormLineTwo.value;
  popupClose(evt.target)
}

function newCardSubmitHandler(evt) {
  evt.preventDefault();
  addCard(newPlaceFormLineOne.value, newPlaceFormLineTwo.value);
  popupClose(evt.target)
}

function closeButtonHandler(evt) {
  if (evt.target.classList.contains('popup__close-button')) {
    popupClose(evt.target)
  }
}

function formCloseOnEscape(evt) {
  if (evt.key === 'Escape') {
    const activeForm = document.querySelector('.popup__active-element');
    if (activeForm) {
      popupClose(activeForm);
    }
  }
}

function formCloseOnOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    popupClose(evt.target.querySelector('.popup__active-element'));
  }
}


//
// Обработка событий
//

profileEditButton.addEventListener('click', showProfilePopup);
cardAddButton.addEventListener('click', showNewCardPopup);
document.addEventListener('click', closeButtonHandler);
newPlaceForm.addEventListener('submit', newCardSubmitHandler);
profileForm.addEventListener('submit', profileSubmitHandler);

document.addEventListener('click', formCloseOnOverlay);


//
// При загрузке страницы заполнить стандартные карты
//

initialCards.forEach((cardData) => {
  addCard(cardData.name, cardData.link);
})
