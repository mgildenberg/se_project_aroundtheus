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
    // this._popupElement.removeEventListener("mousedown", (evt) => {
    //   this._handleClickAway(evt);
    // }); // commented out per reviewer feedback
    // document.removeEventListener("keydown", (evt) => {
    //   this._handleEscClose(evt);
    // }); rewrite for Esc key event listener per reviewer feedback below
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
    // Click Away makes sense to add upon popup open too
    this._popupElement.addEventListener("mousedown", (evt) => {
      this._handleClickAway(evt);
    });
    // responding to close button clicks
    // this._popupCloseButton.addEventListener("click", () => {
    //   this._popupElement.classList.remove("popup_opened");
    // }); // this is no longer needed per reviewer feedback
  }
}
