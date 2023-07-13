function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = document.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.classList.add(errorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = document.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.classList.remove(errorClass);
  errorMessageEl.textContent = "";
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  } //else
  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

// disableButton
function disableButton(buttonEl, inactiveButtonClass) {
  buttonEl.classList.add(inactiveButtonClass);
  buttonEl.disabled = true;
}

// enableButton
function enableButton(buttonEl, inactiveButtonClass) {
  buttonEl.classList.remove(inactiveButtonClass);
  buttonEl.disabled = false;
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    return disableButton(submitButton, inactiveButtonClass);
  } // else
  enableButton(submitButton, inactiveButtonClass);
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  // look for all inputs inside of form
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector); // changed this from All to just Selector
  // loop through all the inputs to see if all are valid
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("keydown", (evt) => {
      // if input is not valid
      // get the validation message
      // add the error class to the input
      // display error message
      checkInputValidity(formEl, inputEl, options);
      // disable button
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  // Loop through form elements
  // Add Event Listener
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation(config);
