export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleCardClick,
    handleTrashClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    // this._handleDeleteConfirm = handleDeleteConfirm;
    this._cardId = _id;
    this._isLiked = isLiked;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true).content.firstElementChild;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    // this._userId = userId;
  }

  _setEventListeners() {
    // ".card__like-button

    this._likeButton.addEventListener("click", () => {
      console.log("like button clicked");
      this._handleLikeButton();
      this.toggleLikeStyle();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._cardTrashButton = this._cardElement.querySelector(
      ".card__trash-button"
    );
    this._cardTrashButton.addEventListener("click", (inputValues) => {
      console.log("card Trash Button clicked");
      this._handleTrashClick(inputValues);
      console.log("card ID is ", this._cardId);
    });
  }

  getLikes() {
    return this._isLiked;
  }

  _setLikeStyle() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  toggleLikeStyle() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // setLikeAction(handleLikeClick) {
  //   this._handleLikeClick = handleLikeClick;
  // }

  _handleLikeButton() {
    this._handleLikeClick(this._cardId);
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _replaceImageData() {
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = `Photo of ${this._name}`;
    this._cardTitleEl.textContent = this._name;
  }

  getView() {
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._replaceImageData();
    this._setLikeStyle();
    this._setEventListeners();
    return this._cardElement;
  }
}
