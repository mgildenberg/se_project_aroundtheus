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
let cardSection;

Promise.all([user, apiCards]).then(([userData, initialCards]) => {
  user = userData._id;
  // console.log("userData", userData);
  pageUserInfo.setUserInfo(userData);
  pageUserInfo.setUserAvatar(userData);
  console.log(initialCards);

  cardSection = new Section(
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

const addNewCardForm = new PopupWithForm("#add-image-popup", (inputValues) => {
  api.addNewCard(inputValues).then((data) => {
    const newCard = createCard(data);
    cardSection.prependItem(newCard);
  });
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

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (cardData) => {
      imageViewerPopup.open(cardData);
    },
    (event) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() =>
        api.deleteCard(cardData._id).then(() => card.remove())
      );
    },
    (cardId) => {
      console.log("card isLiked value starts as", card.getLikes());
      let liked = card.getLikes();
      if (!liked) {
        api.addLike(cardId).then((data) => {
          console.log("card isLiked value is now", data.isLiked);
        });
      } else {
        api.deleteLike(cardId).then((data) => {
          console.log("card isLiked value is now", data.isLiked);
        });
      }
    }
  );
  return card.getView();
}

addProfileFormListeners();
addNewCardListeners();

export default editFormValidator;
