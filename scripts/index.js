// Объявление переменных
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const nameValue = document.querySelector('.profile__name');
const activityValue = document.querySelector('.profile__activity');
const cardAddButton = document.querySelector('.profile__add-button');

const popupPhotoFigure = document.querySelector('.popup__figure')
const popupPhoto = document.querySelector('.popup__figure-photo');
const popupPhotoCaption = document.querySelector('.popup__figure-caption')

const formContainer = document.querySelector('.popup__container');
const formHeader = document.querySelector('.popup__header');
const formFirstLine = document.querySelector('.popup__input_line-one');
const formSecondLine = document.querySelector('.popup__input_line-two');
const formSubmitButton = document.querySelector(".popup__submit-button");

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
  popup.classList.add('popup_opened');
}

// Функция закрыть попап
function popupClose(element) {
  element.closest('.popup__active-element').classList.remove('popup__active-element');
  popup.classList.remove('popup_opened');
}

// Функция действий с формами
function formActions(evt) {
  const pressedButton = evt.target;
  if (pressedButton.classList.contains('profile__edit-button')) {
    showProfilePopup();
    popupOpen();
  }
  else if (pressedButton.classList.contains('popup__close-button')) {
    popupClose(pressedButton);
  }
  else if (pressedButton.classList.contains('profile__add-button')) {
    showNewCardPopup();
    popupOpen();
  }
}

// Функция отображает фотографию в попапе
function showPhotoPopup(evt) {
  popupPhotoCaption.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  popupPhoto.src = evt.target.src;
  popupPhotoFigure.classList.add('popup__active-element');
  popupOpen();
}

// Функция отображает попап с настройкой профиля
function showProfilePopup() {
  clearFormFields();
  formHeader.textContent = "Редактировать профиль"
  formFirstLine.value = nameValue.textContent;
  formSecondLine.value = activityValue.textContent;
  formSubmitButton.textContent = 'Сохранить';
  formContainer.classList.add('popup__active-element');
}

// Функция отобразить попап новая карточка
function showNewCardPopup() {
  clearFormFields();
  formHeader.textContent = 'Новое место';
  formFirstLine.placeholder = 'Название';
  formSecondLine.placeholder = 'Ссылка на картинку';
  formSubmitButton.textContent = 'Создать';
  formContainer.classList.add('popup__active-element');
}

// Функция для очистки полей формы
function clearFormFields() {
  formHeader.textContent = '';
  formFirstLine.value = '';
  formSecondLine.value = '';
  formFirstLine.placeholder = '';
  formSecondLine.placeholder = '';
}

// Функция работы с карточкой
function getCardElement(data) {
  const newCard = cardTemplate.content.cloneNode(true);
  const likeButton = newCard.querySelector('.element__like-button');
  const deleteButton = newCard.querySelector('.element__delete-button');
  const cardImage = newCard.querySelector('.element__image');

  newCard.querySelector('.element__title').textContent = data.name;
  cardImage.src = data.link;

  likeButton.addEventListener('click', likeCardAction);
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', showPhotoPopup)

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

// Функция обработка Отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы

  if (formHeader.textContent === 'Редактировать профиль') {
    // Обновить значения на странице
    nameValue.textContent = evt.target.querySelector('.popup__input_line-one').value;
    activityValue.textContent = evt.target.querySelector('.popup__input_line-two').value;
  }
  else if (formHeader.textContent === 'Новое место') {
    addCard(evt.target.querySelector('.popup__input_line-one').value, evt.target.querySelector('.popup__input_line-two').value);
  }

  popupClose(evt.target);
}


//
// Обработка событий
//

document.addEventListener('click', formActions);

document.addEventListener('submit', formSubmitHandler);


//
// При загрузке страницы заполнить стандартные карты
//

initialCards.forEach((cardData) => {
  addCard(cardData.name, cardData.link);
})
