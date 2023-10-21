import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    // this._formInputs = this._popupForm.querySelectorAll(".popup__input");
  }

  setSubmitAction(callbackFunc) {
    this._callbackFunc = callbackFunc;
  }

  setLoadingState(isLoading) {
    const normalState = this._submitButtonText;
    console.log("in loading state");
    if (isLoading) {
      this._submitButtonText = "...Saving";
      console.log(this._submitButtonText);
    } else {
      this._submitButtonText = normalState;
    }
    console.log("in loading state 2");
  }

  _submitForm() {
    this._callbackFunc(); // this actually runs the passed function upon form submit
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    // this.handleDeleteClick();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("clicked Yes");
      this._submitForm();
    });
  }

  close() {
    // this._popupForm.reset(); // need this line to avoid saving the last input
    super.close();
  }
}
