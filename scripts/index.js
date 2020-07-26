// Объявление переменных
let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let nameValue = document.querySelector('.profile__name');
let activityValue = document.querySelector('.profile__activity');
let nameInput = document.querySelector('.popup__input_name');
let activityInput = document.querySelector('.popup__input_activity');
let formElement = document.querySelector('.popup__container');
let closeButton = document.querySelector('.popup__close-button');


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



// Объявление функций
function openForm() {
  nameInput.value = nameValue.textContent;
  activityInput.value = activityValue.textContent;
  popup.classList.add('popup_opened');
}

function closeForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы

  // Обновить значения на страницу
  nameValue.textContent = nameInput.value;
  activityValue.textContent = activityInput.value;
  // Закрыть форму
  closeForm();
}

// Добавление новой карточки
function addCard(name, link) {
  // Список карточек
  const elementsList = document.querySelector('.elements');

  // карточка из шаблона
  const cardTemplate = document.querySelector("#card-template").content;
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.element__title').textContent = name;
  newCard.querySelector('.element__image').src = link;

  //добавляем карту на страницу
  elementsList.append(newCard);
}


// Обработка событий

editButton.addEventListener('click', openForm);

formElement.addEventListener('submit', formSubmitHandler);

closeButton.addEventListener('click', closeForm);

// При загрузке страницы заполнить стандартные карты
initialCards.forEach((cardData)=> {
  addCard(cardData.name, cardData.link);
})
