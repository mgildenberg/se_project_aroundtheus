// import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// import profileTitle from "../pages/index.js";
import editFormValidator from "../pages/index.js";
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditPopup = document.querySelector("#profile-edit-popup");

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

function openPopup(popup) {
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

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
  /* Disable Submit Button will only run after the form receives its 1st successful input */
  editFormValidator.disableSubmitButton();
}

export {
  handleEscKey,
  handleClickAway,
  handleProfileEditSubmit,
  openPopup,
  closePopup,
};
