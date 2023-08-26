import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputsData = {};
    this._formInputs.forEach((input) => {
      inputsData[input.name] = input.value;
    });
    return inputsData;
  }

  _submitForm() {
    const formInputValues = this._getInputValues();
    this._handleFormSubmit(formInputValues);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      this._submitForm();
    });
  }
  close() {
    this._popupForm.reset(); // need this line to avoid saving the last input
    super.close();
    // this._popupForm.removeEventListener("submit", () => {
    //   this._submitForm();
    //   this.reset();
    // }); // commenting out per reviewer feedback
  }
}
