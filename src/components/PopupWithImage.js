import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageViewerListEl = this._popupElement.querySelector(".image-viewer");
    this._imageViewerImage = this._popupElement.querySelector(
      ".image-viewer__image"
    );

    this._imageViewerCardImage =
      this._popupElement.querySelector(".card__image");
    this._imageViewerTitle = this._imageViewerListEl.querySelector(
      ".image-viewer__title"
    );
  }

  open(cardData) {
    super.open();
    // set the image to the name field of the object
    this._imageViewerImage.src = cardData.link;
    // set the image alt text to the name field of the object
    this._imageViewerImage.alt = `Photo of ${cardData.link}`;
    // set the card title to the name field of the object, too
    this._imageViewerTitle.textContent = cardData.name;
    super.setEventListeners();
  }
}
