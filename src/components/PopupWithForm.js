import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // profileTitle.textContent = profileTitleInput.value;
    // profileDescription.textContent = profileDescriptionInput.value;
    const inputsData = {};
    this._formInputs = this._popupForm.querySelectorAll(".popup__input");
    this._formInputs.forEach((input) => {
      inputsData[input.name] = input.value;
    });
    console.table(this.inputsData);
    return inputsData;
  }

  _submitForm() {
    const formInputValues = this._getInputValues();
    this._handleFormSubmit(formInputValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
  close() {
    this._popupForm.reset();
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
  }
}
