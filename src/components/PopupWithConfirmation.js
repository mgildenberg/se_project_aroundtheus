import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setSubmitAction(callbackFunc) {
    this._callbackFunc = callbackFunc;
  }

  setLoadingState(isLoading, defaultText = "Save") {
    if (isLoading) {
      this._submitButtonText = "...Saving";
    } else {
      this._submitButtonText = defaultText;
    }
  }

  _submitForm() {
    this._callbackFunc(); // this actually runs the passed function upon form submit
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
  }
}
