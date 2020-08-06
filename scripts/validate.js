//
// Объявление функций
//

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
  }
}

// Функция отображения ошибки
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// Функция скрытия поля ошибки
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

// Функция добавления слушателя событий на все поля поля input
function setEventListeners(formElement, inputSelector, errorClass, submitButtonSelector, inactiveButtonClass, inputErrorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  toggleSubmitButtonState(inputList, submitButton, inactiveButtonClass, inputErrorClass)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleSubmitButtonState(inputList, submitButton, inactiveButtonClass, inputErrorClass)
    })
  })
}

// Функция проверки в списке инпутов невалидных
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Функция переключения кнопки submit
function toggleSubmitButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function enableValidation(settings) {
  // Добавить всем формам слушатели событий
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings.inputSelector, settings.errorClass, settings.submitButtonSelector, settings.inactiveButtonClass, settings.inputErrorClass);
  })

}

//
// Включение валидации при загрузке страницы
//

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
