import "./index.css";
import {
  initialCards,
  config,
  profileEditButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
  addNewCardFormEl,
  profileEditFormEl,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

const pageUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: "#profile-avatar",
  // avatorSelector: ".profile__image", idk why but this doesn't work
});

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "98cf51ba-481b-4eec-9343-23efbe8fbf82",
    "Content-Type": "application/json",
  },
});

let user = api.getUserInfo();
let apiCards = api.getInitialCards();

Promise.all([user, apiCards]).then(([userData, initialCards]) => {
  user = userData._id;
  // console.log("userData", userData);
  pageUserInfo.setUserInfo(userData);
  pageUserInfo.setUserAvatar(userData);
  console.log(initialCards);

  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (initialCardData) => {
        const card = createCard(initialCardData);
        cardSection.prependItem(card);
      },
    },
    ".cards__list"
  );

  cardSection.renderItems();
  // pageUserInfo.setUserAvatar(userData.avatar)
});
// .catch(() => (err) => console.log(err));

// console.log(user);
// console.log(apiCards);

function fillProfileForm(e) {
  const currentInfo = pageUserInfo.getUserInfo();
  profileTitleInput.value = currentInfo.name;
  profileDescriptionInput.value = currentInfo.job;
}

const profileEditForm = new PopupWithForm(
  "#profile-edit-popup",
  (inputValues) => {
    //pageUserInfo.setUserInfo(inputValues);
    api.updateUserInfo(inputValues);
    profileEditForm.close();
  }
);
profileEditForm.setEventListeners();

const editFormValidator = new FormValidator(config, profileEditFormEl);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewCardFormEl);
addFormValidator.enableValidation();

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (initialCardData) => {
//       const card = createCard(initialCardData);
//       cardSection.prependItem(card);
//     },
//   },
//   ".cards__list"
// );

// cardSection.renderItems();

const addNewCardForm = new PopupWithForm("#add-image-popup", (inputValues) => {
  // const cardEl = createCard(inputValues);
  const cardEl = api.addNewCard(inputValues);
  cardSection.prependItem(cardEl);
});

function addNewCardListeners() {
  addNewCardButton.addEventListener("click", () => {
    addFormValidator.disableButton(); // disable button ahead of open func
    addNewCardForm.open();
  });

  addNewCardForm.setEventListeners();
}

function addProfileFormListeners() {
  profileEditButton.addEventListener("click", (e) => {
    // open popup only upon clicking edit button
    editFormValidator.disableButton(); // disable button ahead of open func
    profileEditForm.open();
    fillProfileForm(e);
  });
}

const imageViewerPopup = new PopupWithImage("#popup-image-viewer");
imageViewerPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
deleteCardPopup.setEventListeners();

function createCard(inputValues) {
  const cardEl = new Card(
    inputValues,
    "#card-template",
    (inputValues) => {
      imageViewerPopup.open(inputValues);
    },
    (inputValues) => {
      deleteCardPopup.open();
    }, //inputValues); //},
    (inputValues) => {
      // deleteCardPopup.open();
      api.deleteCard(inputValues);
    }
  );
  return cardEl.getView();
}

addProfileFormListeners();
addNewCardListeners();

export default editFormValidator;
