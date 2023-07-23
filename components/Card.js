// Create the Card class, which creates a card with text and an image link, as per the following requirements:
// It takes card data — text and a link to the image
//— and a template element selector as parameters into the constructor.
// It has private methods for working with markup and adding event listeners.
// It has private methods for each event handler.
// It has one public method that returns a fully functional card element populated with data.
// Create a Card class instance for each card
import { openPopup, getImageViewerPopup } from "../pages/index.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // ".card__like-button"
    const likeButton = this._cardElement.querySelector(".card__like-button");

    likeButton.addEventListener("click", () => {
      // console.log("like button clicked");
      // console.log(this);
      // this._handleLikeButton();
      this._cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    });

    const cardImageEl = this._cardElement.querySelector(".card__image");
    cardImageEl.addEventListener("click", () => {
      console.log("image clicked");
      console.log(this._cardElement);
      this._handleImageEl();
    });

    // ".card__trash-button"
    const cardTrashButton = this._cardElement.querySelector(
      ".card__trash-button"
    );
    cardTrashButton.addEventListener("click", () => {
      this._handleTrashButton();
    });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageEl() {
    // setup card info if user clicks to view image
    const cardData = { name: this._name, link: this._link };
    const imageViewerPopup = document.querySelector("#popup-image-viewer");
    getImageViewerPopup(cardData);
    openPopup(imageViewerPopup);
  }

  _replaceImageData() {
    const cardImageEl = this._cardElement.querySelector(".card__image");
    cardImageEl.src = this._link;
    cardImageEl.alt = `Photo of ${this._name}`;
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardTitleEl.textContent = this._name;
    // console.log(cardTitleEl);
  }

  getView() {
    // get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true).content.firstElementChild;

    this._replaceImageData();
    // set event listeners
    this._setEventListeners();
    // console.log(this);
    // return the card
    return this._cardElement;
  }
}
