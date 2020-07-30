// Объявление переменных
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const nameValue = document.querySelector('.profile__name');
const activityValue = document.querySelector('.profile__activity');
const formFirstLine = document.querySelector('.popup__input_line-one');
const formSecondLine = document.querySelector('.popup__input_line-two');
const formElement = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close-button');
const cardAddButton = document.querySelector('.profile__add-button');




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


// При загрузке страницы заполнить стандартные карты
initialCards.forEach((cardData) => {
  addCard(cardData.name, cardData.link);
})


//
// Обработка событий
//

editButton.addEventListener('click', () => { openForm('Редактировать профиль', nameValue.textContent, activityValue.textContent, 'edit') });

cardAddButton.addEventListener('click', () => { openForm('Новое место', 'Название', 'Ссылка на картинку', 'new-card') });

closeButton.addEventListener('click', closeForm);

formElement.addEventListener('submit', formSubmitHandler);

document.addEventListener('click', likeCardAction);

document.addEventListener('click', deleteCard);







//
// Объявление функций
//

//  Фукнция открытие формы
function openForm(form_header, first_line, second_line, type) {

  popup.querySelector('.popup__header').textContent = form_header;
  const submitButton = popup.querySelector('.popup__submit-button');
  if (type === 'edit') {
    formFirstLine.value = first_line;
    formSecondLine.value = second_line;
    submitButton.textContent = 'Сохранить';
    popup.querySelector('.popup__container').classList.add('profile-edit');
  }
  else if (type === 'new-card') {
    formFirstLine.placeholder = first_line;
    formSecondLine.placeholder = second_line;
    submitButton.textContent = 'Создать'
    popup.querySelector('.popup__container').classList.add('new-card');
  }
  popup.classList.add('popup_opened');

}

// Функция очистить форму
function clearForm() {
  formFirstLine.value = '';
  formFirstLine.placeholder = '';
  formSecondLine.value = '';
  formSecondLine.placeholder = '';
}


// Функция закрытие формы
function closeForm() {
  clearForm();
  popup.classList.remove('popup_opened');
  popup.querySelector('.popup__container').classList.remove('profile-edit');
  popup.querySelector('.popup__container').classList.remove('new-card');
}

// Функция обработка Отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы

  if (evt.target.classList.contains('profile-edit')) {
    // Обновить значения на странице
    nameValue.textContent = formFirstLine.value;
    activityValue.textContent = formSecondLine.value;
  }
  else if (evt.target.classList.contains('new-card')) {
    addCard(formFirstLine.value, formSecondLine.value);
  }

  // Закрыть форму
  closeForm();
}


// Функция добавление новой карточки
function addCard(name, link) {
  // Список карточек
  const elementsList = document.querySelector('.elements');

  // карточка из шаблона
  const cardTemplate = document.querySelector("#card-template").content;
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.element__title').textContent = name;
  newCard.querySelector('.element__image').src = link;

  //добавляем карту на страницу
  elementsList.prepend(newCard);
}

// Функция удаления карточки
function deleteCard(event) {
  if (event.target.classList.contains('element__delete-button')) {
    event.target.closest('.element').remove();
  }
}

// Функция лайка
function likeCardAction(event) {
  if (event.target.classList.contains("element__like-button")) {
    event.target.classList.toggle('element__like-button_liked')
  }
}
