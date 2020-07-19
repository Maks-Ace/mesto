// Объявление переменных
let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let nameValue = document.querySelector('.profile__name');
let activityValue = document.querySelector('.profile__activity');
let nameInput = document.querySelector('.popup__input_name');
let activityInput = document.querySelector('.popup__input_activity');
let formElement = document.querySelector('.popup__container');
let closeButton = document.querySelector('.popup__close-button');

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


// Обработка событий

editButton.addEventListener('click', openForm);

formElement.addEventListener('submit', formSubmitHandler);

closeButton.addEventListener('click', closeForm);

