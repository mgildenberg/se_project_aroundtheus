import "./index.css";
import Popup from "../components/Popup.js";
import { initialCards, config } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const pageUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const addNewCardForm = new PopupWithForm(
  "#add-image-popup",
  //   addCardFormSubmit(e)
  (inputValues) => {
    const cardEl = new Card(inputValues, "#card-template");
    const cardListEl = document.querySelector(".cards__list");
    cardListEl.prepend(cardEl.getView());
    console.log(cardEl);

    // function renderCard(cardData, wrapper) {
    //   const card = new Card(cardData, "#card-template");
    //   wrapper.prepend(card.getView());
    // }
    //console.log("addNewCardForm handleFormSubmit function was used")
  }
);

const addNewCardFormEl = document.querySelector("#add-image-form");
const profileEditFormEl = document
  .querySelector("#profile-edit-popup")
  .querySelector(".popup__form");

const addFormValidator = new FormValidator(config, addNewCardFormEl);

addFormValidator.enableValidation();

const profileEditForm = new PopupWithForm(
  "#profile-edit-popup",
  (inputValues) => {
    console.log(inputValues);
    pageUserInfo.setUserInfo(inputValues);
    editFormValidator.disableButton();
    profileEditForm.close();
  }
);

const editFormValidator = new FormValidator(config, profileEditFormEl);
editFormValidator.enableValidation();

// 8/10 this might be duplicative of the other stuff so ill keep it commented out
// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   //   profileTitle.textContent = profileTitleInput.value;
//   //   profileDescription.textContent = profileDescriptionInput.value;
//   //   closePopup(profileEditPopup);
//   /* Disable Submit Button will only run after the form receives its 1st successful input */
//   editFormValidator.disableButton();
// }

function addNewCardListeners() {
  addNewCardButton.addEventListener("click", () => {
    addNewCardForm.open();
  });

  addNewCardForm.setEventListeners();

  // 8/10 update tbh all these listeners are covered by the class

  // close the popup if no changes are desired
  // might already be in the class, check for sprint 8
  //   const addImagePopupCloseButton = addImagePopup.querySelector(
  //     "#add-image-popup-close-button"
  //   );
  // check if this works from the class for sprint 8
  //   addImagePopupCloseButton.addEventListener("click", () => {
  //     addNewCardForm.close();
  //   });
  // fix this for sprint 8
  // save form info and close to show a new card
  //   addNewCardForm.addEventListener("submit", () => {
  //     // addCardFormSubmit(e);
  //     addNewCardForm._submitForm();
  //     addNewCardForm.close();
  //   });
}

function fillProfileForm(e) {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  //   profileEditForm();
}

function addProfileFormListeners() {
  profileEditButton.addEventListener("click", (e) => {
    // open popup only upon clicking edit button
    profileEditForm.open();
    fillProfileForm(e);
    profileEditForm.setEventListeners();
  });
  // close the popup if no changes are desired // this is already covered in the class so might delete
  //   profileEditPopupCloseButton.addEventListener("click", () => {
  //     profileEditForm.close();
  //   });
  // save and close the modified profile info

  // fix this, put it back for sprint 8
  //profileEditForm.addEventListener("submit", handleProfileEditSubmit);
}

addProfileFormListeners();
addNewCardListeners();

export default editFormValidator;
