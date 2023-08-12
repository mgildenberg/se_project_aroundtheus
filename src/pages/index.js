import "./index.css";
// import Popup from "../components/Popup.js";
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
  //   profileEditForm();
}

const addFormValidator = new FormValidator(config, addNewCardFormEl);
addFormValidator.enableValidation();

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

const cardSection = new Section({
  items: initialCards,
  renderer: (initialCardData) => {
    console.log(initialCardData);
    const card = createCard(initialCardData);
    // console.log(initialCardData);
    //cardSection.addItem(card); // i just commented out this one, then commented it back in 12:48
  },
  cardElementsSelector: ".cards__list",
});

cardSection.renderItems();

const addNewCardForm = new PopupWithForm("#add-image-popup", (inputValues) => {
  const cardEl = createCardAddition(inputValues);
  console.log(cardSection);
  console.log(cardEl);
  cardSection.addItem(cardEl);
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

function handleCardClickFunc(initialCardData) {
  const cardData = { name: initialCardData.name, link: initialCardData.link };
  //   console.log(cardData);
  const imageViewerPopup = new PopupWithImage("#popup-image-viewer", cardData);
  imageViewerPopup.open();
  imageViewerPopup.setEventListeners();
}

function createCard(inputValues) {
  const cardEl = new Card(
    inputValues,
    "#card-template"
    // handleCardClickFunc(inputValues)
  );
  cardListEl.append(cardEl.getView()); // 12:47 comment out // 12:48 comment back in
  return cardEl.getView();
}

function createCardAddition(inputValues) {
  const cardEl = new Card(
    inputValues,
    "#card-template"
    // handleCardClickFunc(inputValues)
  );
  console.log(cardEl.getView());
  //cardListEl.append(cardEl.getView()); // 12:47 comment out // 12:48 comment back in
  return cardEl.getView();
}

function createCardList(cards) {
  const cardList = cards.forEach((cardObject) => {
    createCard(cardObject);
  });
  return cardList;
}

///// fix this before submitting sprint 8 ///
//  handleImageEl(name, link) {
//     // setup card info if user clicks to view image
//     const cardData = { 'name': name, 'link': link };
//     console.log(cardData);
//     const imageViewerPopup = new PopupWithImage(
//       "#popup-image-viewer",
//       cardData
//     );
//     console.log(imageViewerPopup);
//     imageViewerPopup.open();
//     imageViewerPopup.setEventListeners();
//   }

addProfileFormListeners();
addNewCardListeners();

export default editFormValidator;
