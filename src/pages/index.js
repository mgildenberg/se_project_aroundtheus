import "./index.css";
import {
  initialCards,
  config,
  profileEditButton,
  addNewCardButton,
  profileTitleInput,
  profileTitle,
  profileDescription,
  profileDescriptionInput,
  addNewCardFormEl,
  profileEditFormEl,
  cardListEl,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";

const pageUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function fillProfileForm(e) {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

const profileEditForm = new PopupWithForm(
  "#profile-edit-popup",
  (inputValues) => {
    pageUserInfo.setUserInfo(inputValues);
    editFormValidator.disableButton();
    profileEditForm.close();
  }
);

const editFormValidator = new FormValidator(config, profileEditFormEl);
editFormValidator.enableValidation();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (initialCardData) => {
      const card = createCard(initialCardData);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

const addFormValidator = new FormValidator(config, addNewCardFormEl);
addFormValidator.enableValidation();

const addNewCardForm = new PopupWithForm("#add-image-popup", (inputValues) => {
  const cardEl = createCardAddition(inputValues);
  addFormValidator.disableButton();
  cardSection.prependItem(cardEl);
});

function addNewCardListeners() {
  addNewCardButton.addEventListener("click", () => {
    addNewCardForm.open();
  });

  addNewCardForm.setEventListeners();
}

function addProfileFormListeners() {
  profileEditButton.addEventListener("click", (e) => {
    // open popup only upon clicking edit button
    profileEditForm.open();
    fillProfileForm(e);
    profileEditForm.setEventListeners();
  });
}

const imageViewerPopup = new PopupWithImage("#popup-image-viewer");

function createCard(inputValues) {
  const cardEl = new Card(inputValues, "#card-template", (inputValues) => {
    imageViewerPopup.open(inputValues);
  });
  cardListEl.append(cardEl.getView());
  //return cardEl.getView();
}

function createCardAddition(inputValues) {
  const cardEl = new Card(inputValues, "#card-template", (inputValues) => {
    imageViewerPopup.open(inputValues);
  });
  //cardListEl.append(cardEl.getView()); // this is the difference between createCard and createCardAddition
  return cardEl.getView();
}

addProfileFormListeners();
addNewCardListeners();

export default editFormValidator;
