// const settings = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// };

class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;

    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      return this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _showInputError(inputElement) {
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.classList.add(this._errorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    // look for all inputs inside of form
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    // loop through all the inputs to see if all are valid
    this._inputEls.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        // if input is not valid
        // get the validation message
        // add the error class to the input
        // display error message
        this._checkInputValidity(inputElement);
        // disable button
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    const formEl = this._form;
    // Loop through form elements
    // Add Event Listener
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formEl);
  }

  disableSubmitButton() {
    // if the button is not already disabled, disable it
    if (!this._submitButton.classList.contains(this._inactiveButtonClass)) {
      this._disableButton();
    }
    // Reset all the form's inputs
    this._form.reset();
  }
}

export default FormValidator;
