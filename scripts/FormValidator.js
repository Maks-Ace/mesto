

export default class FormValidator {
  constructor(paramObj, formElement) {
    this._formSelector = paramObj.formSelector;
    this._inputSelector = paramObj.inputSelector;
    this._submitButtonSelector = paramObj.submitButtonSelector;
    this._inactiveButtonClass = paramObj.inactiveButtonClass;
    this._inputErrorClass = paramObj.inputErrorClass;
    this._errorClass = paramObj.errorClass;
    this._formElement = formElement;

  }

  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach(inputElement => {
      this._toggleSubmitButtonState(inputList);
      inputElement.addEventListener('input', () => {
        this._toggleSubmitButtonState(inputList);
        this._checkInputValidity(inputElement);
      })
    });
    this._setEventListeners();
  }

  _checkInputValidity(inputElement) {
    inputElement.validity.valid ? this._hideError(inputElement) : this._showError(inputElement);
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => { return !inputElement.validity.valid });
  }

  _showError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleSubmitButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _prepareForm() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach(inputElement => {
      this._hideError(inputElement);
    });
    this._toggleSubmitButtonState(inputList);
  }

  _setEventListeners() {
    this._formElement.addEventListener('reset', () => {
      this._prepareForm();
    });
  }
}
