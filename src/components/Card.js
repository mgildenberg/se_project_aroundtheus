// Create the Card class, which creates a card with text and an image link, as per the following requirements:
// It takes card data — text and a link to the image
//— and a template element selector as parameters into the constructor.
// It has private methods for working with markup and adding event listeners.
// It has private methods for each event handler.
// It has one public method that returns a fully functional card element populated with data.
// Create a Card class instance for each card
//import { getImageViewerPopup } from "../pages/index.js";
// import { openPopup } from "../utils/utils.js";
// import PopupWithImage from "./PopupWIthImage.js";

// to do: define handleCardClick in index.js
// delete the private method below but use its logic as described above

export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    // ".card__like-button
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // this._cardImageEl.addEventListener("click", (e) => {
    //   console.log("image clicked");
    //   console.log(this._handleCardClick);
    //   const clickInputs = {
    //     name: e.currentTarget.name,
    //     link: e.currentTarget.src,
    //   };
    //   this._handleCardClick({ clickInputs });
    // });
    this._cardImageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
      // console.log("we are in the event listener");
      // console.log("card event listener", {
      //   name: this._name,
      //   link: this._link,
      // });
    });

    this._cardTrashButton.addEventListener("click", () => {
      this._handleTrashButton();
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  ///// fix this before submitting sprint 8 ///
  // _handleImageEl() {
  //   // setup card info if user clicks to view image
  //   const cardData = { name: this._name, link: this._link };
  //   console.log(cardData);
  //   // console.log(cardData);
  //   // const imageViewerPopup = document.querySelector("#popup-image-viewer");
  //   const imageViewerPopup = new PopupWithImage(
  //     "#popup-image-viewer",
  //     cardData
  //   );
  //   console.log(imageViewerPopup);
  //   imageViewerPopup.open();
  //   imageViewerPopup.setEventListeners();
  // }

  _replaceImageData() {
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = `Photo of ${this._name}`;
    this._cardTitleEl.textContent = this._name;
  }

  getView() {
    // get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true).content.firstElementChild;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTrashButton = this._cardElement.querySelector(
      ".card__trash-button"
    );
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    this._replaceImageData();
    // set event listeners
    this._setEventListeners();
    // return the card

    // console.log(this._cardElement);
    return this._cardElement;
  }
}
