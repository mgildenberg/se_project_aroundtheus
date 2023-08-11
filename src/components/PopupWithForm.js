import Popup from "./Popup.js";
import UserInfo from "../pages/index.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputsData = {};
    this._formInputs = this._popupForm.querySelectorAll(".popup__input");
    //console.log(this._formInputs);
    this._formInputs.forEach((input) => {
      //   console.log(input);
      inputsData[input.name] = input.value;
    });
    // console.table(inputsData);
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
    this._popupForm.reset();
    super.close();
    this._popupForm.removeEventListener("submit", () => {
      this._submitForm();
    });
  }
}
