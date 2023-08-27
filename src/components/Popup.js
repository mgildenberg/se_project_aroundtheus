export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popup
    console.log("popup class open");
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("popup_opened");
    // rewrite for Esc key event listener
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    // arrow function binds this to the popup so event listener removal works
    // listens for esc button
    if (evt.key == "Escape") {
      this.close();
    }
  };

  _handleClickAway = (evt) => {
    // arrow function binds this to the popup
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    // Click Away is the remaining event listener
    this._popupElement.addEventListener("mousedown", this._handleClickAway);
  }
}
