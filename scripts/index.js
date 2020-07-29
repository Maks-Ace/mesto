// Объявление переменных
let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let nameValue = document.querySelector('.profile__name');
let activityValue = document.querySelector('.profile__activity');
let formFirstLine = document.querySelector('.popup__input_line-one');
let formSecondLine = document.querySelector('.popup__input_line-two');
let formElement = document.querySelector('.popup__container');
let closeButton = document.querySelector('.popup__close-button');
let cardAddButton = document.querySelector('.profile__add-button');


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
// Обработка событий
//

editButton.addEventListener('click', () => { openForm('Редактировать профиль', nameValue.textContent, activityValue.textContent, 'edit') });

cardAddButton.addEventListener('click', () => { openForm('Новое место', 'Название', 'Ссылка на картинку', 'new-card') });

closeButton.addEventListener('click', closeForm);

formElement.addEventListener('submit', formSubmitHandler);



// При загрузке страницы заполнить стандартные карты
initialCards.forEach((cardData) => {
  addCard(cardData.name, cardData.link);
})



//
// Объявление функций
//

// Открытие формы
function openForm(form_header, first_line, second_line, type) {

  popup.querySelector('.popup__header').textContent = form_header;
  const submitButton = popup.querySelector('.popup__submit-button');
  if (type === 'edit') {
    formFirstLine.value = first_line;
    formSecondLine.value = second_line;
    submitButton.textContent = 'Сохранить';
    popup.querySelector('.popup__container').classList.add('profile-edit');
  }
  else if( type === 'new-card') {
    formFirstLine.placeholder = first_line;
    formSecondLine.placeholder = second_line;
    submitButton.textContent = 'Создать'
    popup.querySelector('.popup__container').classList.add('new-card');
  }
  popup.classList.add('popup_opened');

}

// Очистить форму
function clearForm() {
  formFirstLine.value = '';
  formFirstLine.placeholder = '';
  formSecondLine.value = '';
  formSecondLine.placeholder = '';
}


// Закрытие формы
function closeForm() {
  clearForm();
  popup.classList.remove('popup_opened');
  popup.querySelector('.popup__container').classList.remove('profile-edit');
  popup.querySelector('.popup__container').classList.remove('new-card');
}

// Обработка Отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы

  if (evt.target.classList.contains('profile-edit')){
    // Обновить значения на странице
    nameValue.textContent = formFirstLine.value;
    activityValue.textContent = formSecondLine.value;
  }
  else if(evt.target.classList.contains('new-card')){
    addCard(formFirstLine.value, formSecondLine.value);
  }

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
  elementsList.prepend(newCard);
}
