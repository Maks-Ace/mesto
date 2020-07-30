// Объявление переменных
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const nameValue = document.querySelector('.profile__name');
const activityValue = document.querySelector('.profile__activity');
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

document.addEventListener('click', closeForm);

document.addEventListener('submit', formSubmitHandler);

document.addEventListener('click', likeCardAction);

document.addEventListener('click', deleteCard);

document.addEventListener('click', openPhoto);



//
// Объявление функций
//

//  Фукнция открытие формы
function openForm(form_header, first_line, second_line, type) {

  popupClean();

  // Скопировать и добавить шаблон
  const containerTemplate = document.querySelector('#form-template').content;
  const newForm = containerTemplate.cloneNode(true);

  newForm.querySelector('.popup__header').textContent = form_header;
  const formElement = newForm.querySelector('.popup__container');
  const submitButton = newForm.querySelector('.popup__submit-button');
  const formFirstLine = newForm.querySelector('.popup__input_line-one');
  const formSecondLine = newForm.querySelector('.popup__input_line-two');

  if (type === 'edit') {
    formFirstLine.value = first_line;
    formSecondLine.value = second_line;
    submitButton.textContent = 'Сохранить';
    formElement.classList.add('profile-edit');
  }
  else if (type === 'new-card') {
    formFirstLine.placeholder = first_line;
    formSecondLine.placeholder = second_line;
    submitButton.textContent = 'Создать'
    formElement.classList.add('new-card');
  }
  popup.append(newForm);
  popup.classList.add('popup_opened');
}



// Функция закрытие формы
function closeForm(evt) {
  if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__submit-button')) {
    popup.classList.remove('popup_opened');
  }
}

// Функция обработка Отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы

  if (evt.target.classList.contains('profile-edit')) {
    // Обновить значения на странице
    nameValue.textContent = evt.target.querySelector('.popup__input_line-one').value;
    activityValue.textContent = evt.target.querySelector('.popup__input_line-two').value;
  }
  else if (evt.target.classList.contains('new-card')) {
    addCard(evt.target.querySelector('.popup__input_line-one').value, evt.target.querySelector('.popup__input_line-two').value);
  }

  // Закрыть форму
  closeForm(evt);
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
function likeCardAction(evt) {
  if (evt.target.classList.contains("element__like-button")) {
    evt.target.classList.toggle('element__like-button_liked')
  }
}

// Функция открытия фото
function openPhoto(evt) {

  if (evt.target.classList.contains("element__image")) {

    popupClean();

    // Получить ссылку и подпись
    const link = evt.target.src;
    const caption = evt.target.closest('.element').querySelector('.element__title').textContent;

    // создать из шаблона копию
    const photoTemplate = document.querySelector('#photo-template').content;
    const newPhotoFigure = photoTemplate.cloneNode(true);

    //заполнить данные
    newPhotoFigure.querySelector('.popup__figure-photo').src = link;
    newPhotoFigure.querySelector('.popup__figure-caption').textContent = caption;

    // добавить в попап и открыть его
    popup.append(newPhotoFigure);
    popup.classList.add('popup_opened');
  }
}

// Функция очистить попап
function popupClean() {
  popup.innerHTML = ''
}
