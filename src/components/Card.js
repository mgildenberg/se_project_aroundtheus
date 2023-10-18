export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleCardClick,
    handleTrashClick
    // handleDeleteConfirm
    // cardId,
    // userId
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    // this._handleDeleteConfirm = handleDeleteConfirm;
    this._cardId = _id;
    this._isLiked = isLiked;
    // this._userId = userId;
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
    this._cardTrashButton.addEventListener("click", (inputValues) => {
      console.log("card Trash Button clicked");
      this._handleTrashClick(inputValues);
      console.log("card ID is ", this._cardId);
      // this._handleDeleteConfirm(this._cardId);
      // this._handleDeleteClick(this._cardId, this._userId);
      // this._handleTrashButton();
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
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
    // get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true).content.firstElementChild;

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._replaceImageData();
    this._setEventListeners();
    return this._cardElement;
  }
}
