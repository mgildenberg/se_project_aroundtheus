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
      //   closePopup(evt.currentTarget);
      this.close();
    }
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("popup_opened");
    this._popupElement.removeEventListener("mousedown", (evt) => {
      this._handleClickAway(evt);
    });
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  open() {
    // opens popup
    this._popupElement.classList.add("popup_opened");
  }

  setEventListeners() {
    // this._popupElement close icon addEventListener("click", close)
    // Checklist says Esc listener must be prompted by popup open
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    // Click Away makes sense to add upon popup open too
    this._popupElement.addEventListener("mousedown", (evt) => {
      this._handleClickAway(evt);
    });
    this._popupCloseButton.addEventListener("click", () => {
      this._popupElement.classList.remove("popup_opened");
    });
  }
}
