import FormValidator from './FormValidator.js';

// Глобальный объект с параметрами
const paramObj = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export default paramObj;

//
// Включение валидации при загрузке страницы
//

const formList = Array.from(document.querySelectorAll('.popup__container'));
formList.forEach(formElement => {
  const formClassElement = new FormValidator(paramObj, formElement);
  formClassElement.enableValidation();
})
