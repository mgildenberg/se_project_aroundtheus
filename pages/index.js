import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  handleProfileEditSubmit,
  openPopup,
  closePopup,
} from "../utils/utils.js";

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
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const addImagePopup = document.querySelector("#add-image-popup");
const imagePopupCloseButton = addImagePopup.querySelector(
  "#add-image-popup-close-button"
);
// const addImagePopupSubmitButton = addImagePopup.querySelector(
//   "#add-image-popup-submit-button"
// );
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

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function fillProfileForm(e) {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function addCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const newCardDataObj = { name: name, link: link };
  renderCard(newCardDataObj, cardListEl);
  closePopup(addImagePopup);
  // disables button after the card form is submitted for the 1st time based on design
  //
  addFormValidator.disableSubmitButton();
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
  addNewCardForm.addEventListener("submit", (e) => {
    addCardFormSubmit(e);
  });
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template"); // cardTemplate exists too
  wrapper.prepend(card.getView());
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

// enabling validation by calling enableValidation()
// pass all the settings on call

const editFormElement = profileEditForm;
const addFormElement = addNewCardForm;

const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

export default editFormValidator;
