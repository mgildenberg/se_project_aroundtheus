import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    //this._popupForm = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupElement.querySelector(".popup__button");
    //this._submitButtonText = this._submitButton.textContent;
    // this._formInputs = this._popupForm.querySelectorAll(".popup__input");
  }

  // _getInputValues() {
  //   const inputsData = {};
  //   this._formInputs.forEach((input) => {
  //     inputsData[input.name] = input.value;
  //   });
  //   return inputsData;
  // }

  _submitForm() {
    // const formInputValues = this._getInputValues();
    // this._handleFormSubmit(formInputValues);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    // this.handleDeleteClick();
    this._submitButton.addEventListener("click", () => {
      console.log("clicked Yes");
      this._submitForm();
    });
  }

  close() {
    // this._popupForm.reset(); // need this line to avoid saving the last input
    super.close();
  }
}
