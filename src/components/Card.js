export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    // ".card__like-button

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._cardTrashButton = this._cardElement.querySelector(
      ".card__trash-button"
    );
    this._cardTrashButton.addEventListener("click", (element) => {
      console.log(this._cardTrashButton);
      this._handleTrashButton(element);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleTrashButton(element) {
    console.log(element);
    // console.log(this._cardElement);
    this._cardElement.remove();
    // console.log(this._cardElement);
    // this._cardElement = null;
  }

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

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._setEventListeners();
    this._replaceImageData();
    // set event listeners
    // console.log(this._cardElement);
    return this._cardElement;
  }
}
