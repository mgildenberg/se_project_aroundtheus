export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");
  }

  _handleEscClose(evt) {
    // listens for esc button
    if (evt.key == "Escape") {
      this.close();
    }
  }

  _handleClickAway(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("popup_opened");
    // rewrite for Esc key event listener
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("popup_opened");
    // Checklist says Esc listener must be prompted by popup open
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  setEventListeners() {
    // Click Away is the remaining event listener
    this._popupElement.addEventListener("mousedown", (evt) => {
      this._handleClickAway(evt);
    });
  }
}
