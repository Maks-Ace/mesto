import { showPhotoPopup } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    // fill all necessary values
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  // return new card element from template
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // слушатель для кнопки лайк
    this._element.querySelector('.element__like-button').addEventListener('click', this._likeCardAction);

    // слушатель для кнопки удалить карточку
    this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteCard);

    // слушатель для клика по картинке
    this._element.querySelector('.element__image').addEventListener('click', () => { showPhotoPopup({ name: this._name, link: this._link }) })
  }

  // Функция лайка карточки
  _likeCardAction(evt) {
    evt.target.classList.toggle("element__like-button_liked");
  }

  // Функция удаления карточки
  _deleteCard(event) {
    if (event.target.classList.contains("element__delete-button")) {
      event.target.closest(".element").remove();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector(".element__image");

    this._element.querySelector(".element__title").textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `фото - ${this._name}`;

    return this._element;
  }
}
