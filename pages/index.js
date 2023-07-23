import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// const cardData = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

// -------------------------- Elements ---------------------------  //

// Profile Edit Popup
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditPopup = document.querySelector("#profile-edit-popup");
const profileEditPopupCloseButton = profileEditPopup.querySelector(
  "#profile-edit-popup-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditPopup.querySelector(".popup__form");

// Add New Card Popup
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const addImagePopup = document.querySelector("#add-image-popup");
const imagePopupCloseButton = addImagePopup.querySelector(
  "#add-image-popup-close-button"
);
const addImagePopupSubmitButton = addImagePopup.querySelector(
  "#add-image-popup-submit-button"
);
const addNewCardForm = addImagePopup.querySelector("#add-image-form");
const cardTitleInput = addNewCardForm.querySelector(".popup__input_type_title");
const cardUrlInput = addNewCardForm.querySelector(".popup__input_type_url");

// Image Viewer Popup
const imageViewerPopup = document.querySelector("#popup-image-viewer");
const imageViewerPopupContainer = imageViewerPopup.querySelector(
  ".popup__container_image"
);
const imageViewerPopupCloseButton = imageViewerPopup.querySelector(
  "#image-viewer-popup-close-button"
);
const imageViewerListEl =
  imageViewerPopupContainer.querySelector(".image-viewer");

// --------------------------- Functions --------------------------- //

function handleEscKey(evt) {
  if (evt.key == "Escape") {
    const popupOpenedEl = document.querySelector(".popup_opened");
    closePopup(popupOpenedEl);
  }
}

function handleClickAway(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  // Checklist says Esc listener must be prompted by popup open
  document.addEventListener("keydown", handleEscKey);
  // Click Away makes sense to add upon popup open too
  popup.addEventListener("mousedown", handleClickAway);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  // Remove listeners
  popup.removeEventListener("mousedown", handleClickAway);
  document.removeEventListener("keydown", handleEscKey);
}

function replaceImageData(cardData, imageElement, titleElement) {
  // set the image to the name field of the object, too
  imageElement.src = cardData.link;
  // set the image alt text to the name field of the object
  imageElement.alt = `Photo of ${cardData.name}`;
  // set the card title to the name field of the object, too
  titleElement.textContent = cardData.name;
}

export function getImageViewerPopup(cardData) {
  // const imageViewerElement = imageViewerTemplate.cloneNode(true);
  const imageViewerImage = imageViewerListEl.querySelector(
    ".image-viewer__image"
  );
  const imageViewerTitle = imageViewerListEl.querySelector(
    ".image-viewer__title"
  );
  replaceImageData(cardData, imageViewerImage, imageViewerTitle);
}

// function getCardElement(cardData) {
//   const card = new Card(cardData, "#card-template"); // cardTemplate exists too
//   const cardElement = card.getView();
// console.log(cardElement);
// clone the template element with all its content and store it in a cardElement variable
//const cardElement = cardTemplate.cloneNode(true);
// access the card title and image and store them in variables
//const cardImageEl = cardElement.querySelector(".card__image");
//const cardTitleEl = cardElement.querySelector(".card__title");
// console.log(cardElement);
//const likeButton = cardElement.querySelector(".card__like-button");
//const cardTrashButton = cardElement.querySelector(".card__trash-button");
//replaceImageData(cardData, cardImageEl, cardTitleEl);
// like button active and inactive
// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });
// trash photo event and function
// cardTrashButton.addEventListener("click", () => {
//   const deleteCardElementParent = cardTrashButton.closest(".card");
//   deleteCardElementParent.remove();
// });

// setup card info if user clicks to view image
// cardImageEl.addEventListener("click", () => {
//   getImageViewerPopup(cardData);
//   openPopup(imageViewerPopup);
// });

//   return cardElement;
// }

function fillProfileForm(e) {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
}

function addCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addImagePopup);
  addNewCardForm.reset();
  // toggleButtonState(
  //   { name, link },
  //   addNewCardButton,
  //   config["inactiveButtonClass"]
  // );
  // toggleButtonState(e.currentTarget, e.target, config["inactiveButtonClass"]);
}

function addProfileFormListeners() {
  profileEditButton.addEventListener("click", () => {
    // open popup only upon clicking edit button
    openPopup(profileEditPopup);

    //form is prefilled with existing content instead of generic placeholders
    fillProfileForm();
  });
  // close the popup if no changes are desired
  profileEditPopupCloseButton.addEventListener("click", () => {
    closePopup(profileEditPopup);
  });
  // save and close the modified profile info
  profileEditForm.addEventListener("submit", handleProfileEditSubmit);
}

function addNewCardListeners() {
  addNewCardButton.addEventListener("click", () => {
    openPopup(addImagePopup);
  });
  // close the popup if no changes are desired
  imagePopupCloseButton.addEventListener("click", () => {
    closePopup(addImagePopup);
  });
  // save form info and close to show a new card
  addNewCardForm.addEventListener("submit", addCardFormSubmit);
}

function renderCard(cardData, wrapper) {
  //const cardElement = getCardElement(cardData);
  const card = new Card(cardData, "#card-template"); // cardTemplate exists too
  wrapper.prepend(card.getView());
  // console.log(card.getView());
  //wrapper.prepend(cardElement);
}

function addImageViewerListeners() {
  imageViewerPopupCloseButton.addEventListener("click", () => {
    closePopup(imageViewerPopup);
  });
}

// Loops
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// Call functions needed upon pageload
addProfileFormListeners();
addNewCardListeners();
addImageViewerListeners();
