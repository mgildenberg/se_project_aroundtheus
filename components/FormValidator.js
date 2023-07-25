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

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _disableButton(buttonEl, inactiveButtonClass) {
    buttonEl.classList.add(inactiveButtonClass);
    buttonEl.disabled = true;
  }

  _enableButton(buttonEl, inactiveButtonClass) {
    buttonEl.classList.remove(inactiveButtonClass);
    buttonEl.disabled = false;
  }

  _toggleButtonState(inputEls, submitButton) {
    if (this._hasInvalidInput(inputEls)) {
      return this._disableButton(submitButton, this._inactiveButtonClass);
    } else {
      this._enableButton(submitButton, this._inactiveButtonClass);
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
    //console.log(!inputElement.validity.valid);
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    // look for all inputs inside of form
    const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    // loop through all the inputs to see if all are valid
    inputEls.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        // if input is not valid
        // get the validation message
        // add the error class to the input
        // display error message
        // _checkInputValidity(formEl, inputEl, options);
        this._checkInputValidity(inputElement); //, options);
        // disable button
        this._toggleButtonState(inputEls, submitButton); // refactor this
      });
    });
  }

  enableValidation() {
    // function enableValidation(options) {
    const formEl = this._form;
    console.log("we are running enableValidation", formEl);
    // Loop through form elements
    // Add Event Listener
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      formEl.reset();
    });
    this._setEventListeners(formEl); //, options);
  }
  //   }

  disableSubmitButton() {} //checklist requires this
}

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// // this will go to index js later
// const editFormValidator = new FormValidator(settings, editForm);
// editFormValidator.enableValidation();
// const addCardFormValidator = new FormValidator(settings, addCardForm);
// addCardFormValidator.enableValidation();

export default FormValidator;
