import "./index.css";
import {
  initialCards,
  config,
  profileEditButton,
  profileEditAvatarButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
  addNewCardFormEl,
  profileEditFormEl,
  profileEditAvatarFormEl,
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
});

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "98cf51ba-481b-4eec-9343-23efbe8fbf82",
    "Content-Type": "application/json",
  },
});

let user = api.getUserInfo().catch((err) => console.log(err));
let apiCards = api.getInitialCards().catch((err) => console.log(err));
let cardSection;

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (cardData) => {
      imageViewerPopup.open(cardData);
    },
    () => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        deleteCardPopup.setLoadingState(true);
        api
          .deleteCard(cardData._id)
          .then(() => {
            deleteCardPopup.close();
            card.remove();
          })
          .catch((err) => console.log(err))
          .finally(deleteCardPopup.setLoadingState(false));
      });
    },
    (cardId) => {
      const liked = card.getLikes();
      if (!liked) {
        api
          .addLike(cardId)
          .then((response) => {
            card.setIsLiked(response.isLiked);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .deleteLike(cardId)
          .then((response) => {
            card.setIsLiked(response.isLiked);
          })
          .catch((err) => console.log(err));
      }
    }
  );
  return card.getView();
}

Promise.all([user, apiCards]).then(([userData, initialCards]) => {
  user = userData._id;
  pageUserInfo.setUserInfo(userData);
  pageUserInfo.setUserAvatar(userData);

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
});

function fillProfileForm(e) {
  const currentInfo = pageUserInfo.getUserInfo();
  profileTitleInput.value = currentInfo.name;
  profileDescriptionInput.value = currentInfo.job;
}

const profileEditForm = new PopupWithForm(
  "#profile-edit-popup",
  (inputValues) => {
    profileEditForm.setLoadingState(true);
    api.updateUserInfo(inputValues).then(() => {
      api
        .getUserInfo()
        .then((data) => {
          profileEditForm.close();
          pageUserInfo.setUserInfo(data);
        })
        .catch((err) => console.log(err))
        .finally(profileEditForm.setLoadingState(false));
    });
  }
);
profileEditForm.setEventListeners();

const editFormValidator = new FormValidator(config, profileEditFormEl);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewCardFormEl);
addFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(
  config,
  profileEditAvatarFormEl
);
editAvatarFormValidator.enableValidation();

const addNewCardForm = new PopupWithForm("#add-image-popup", (inputValues) => {
  addNewCardForm.setLoadingState(true);
  api
    .addNewCard(inputValues)
    .then((responseDataObj) => {
      const newCard = createCard(responseDataObj.data);
      addNewCardForm.close();
      cardSection.prependItem(newCard);
    })
    .catch((err) => console.log(err))
    .finally(addNewCardForm.setLoadingState(false));
});

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-popup",
  (inputValues) => {
    editAvatarPopup.setLoadingState(true);
    api
      .updateAvatar(inputValues)
      .then((responseDataObj) => {
        pageUserInfo.setUserAvatar(responseDataObj);
        editAvatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(editAvatarPopup.setLoadingState(false));
  }
);

function addEditAvatarPopupListeners() {
  profileEditAvatarButton.addEventListener("click", () => {
    editAvatarFormValidator.disableButton(); // disable button ahead of open func
    editAvatarPopup.open();
  });

  editAvatarPopup.setEventListeners();
}
addEditAvatarPopupListeners();

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

addProfileFormListeners();
addNewCardListeners();

export default editFormValidator;
