import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { name, link }) {
    super({ popupSelector });
    // this._popupWithImageEl = this._popupElement;
    // .querySelector(
    //   ".popup__container_image"
    // );
    this._name = name;
    this._link = link;
    this._imageViewerListEl = this._popupElement.querySelector(".image-viewer");
    this._imageViewerImage = this.popupElement.querySelector(
      ".image-viewer__image"
    );
    this._imageViewerTitle = this._imageViewerListEl.querySelector(
      ".image-viewer__title"
    );
  }

  _replaceImageData() {
    // set the image to the name field of the object
    this._imageViewerImage.src = this._link;
    // set the image alt text to the name field of the object
    this._imageViewerImage.alt = `Photo of ${this._name}`;
    // set the card title to the name field of the object, too
    this._imageViewerTitle.textContent = this._name;
  }

  open() {
    super.open();
    this._replaceImageData();
  }
}
