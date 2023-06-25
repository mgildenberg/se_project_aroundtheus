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

// ------------------ Elements ------------------------------------------- //

// Profile Edit Modal
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Add New Card Modal
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const addImageModal = document.querySelector("#add-image-modal");
const imageModalCloseButton = addImageModal.querySelector(
  "#modal-close-button"
);
const addNewCardForm = addImageModal.querySelector("#add-image-form");
const cardTitleInput = addNewCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addNewCardForm.querySelector(".modal__input_type_url");

// Image Viewer Modal
const imageViewerTemplate = document.querySelector("#image-viewer-template")
  .content.firstElementChild;
const imageViewerModal = document.querySelector("#modal-image-viewer");
const imageViewerModalContainer = imageViewerModal.querySelector(
  ".modal__container_image"
);
const imageViewerModalCloseButton = imageViewerModal.querySelector(
  "#modal-close-button"
);

// card__trash - button;

// ------------------ Functions ------------------------------------------- //

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  console.log("closing modal");
  modal.classList.remove("modal_opened");
}

function replaceImageData(cardData, imageElement, titleElement) {
  // set the image to the name field of the object, too
  imageElement.src = cardData.link;
  // set the image alt text to the name field of the object
  imageElement.alt = `Photo of ${cardData.name}`;
  // set the card title to the name field of the object, too
  titleElement.textContent = cardData.name;
}

function getImageViewerModal(cardData) {
  // clone the template element with all its content and store it in an imageViewerElement variable
  const imageViewerElement = imageViewerTemplate.cloneNode(true);
  const imageViewerImage = imageViewerElement.querySelector(
    ".image-viewer__image"
  );
  const imageViewerTitle = imageViewerElement.querySelector(
    ".image-viewer__title"
  );
  replaceImageData(cardData, imageViewerImage, imageViewerTitle);
  imageViewerModalContainer.append(imageViewerElement);
  return imageViewerElement;
}

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTrashButton = cardElement.querySelector(".card__trash-button");
  replaceImageData(cardData, cardImageEl, cardTitleEl);
  // like button active and inactive
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  // trash photo event and function
  cardTrashButton.addEventListener("click", () => {
    const deleteCardElementParent = cardTrashButton.closest(".card");
    deleteCardElementParent.remove();
  });

  // setup card info if user clicks to view image
  cardImageEl.addEventListener("click", () => {
    getImageViewerModal(cardData);
    openModal(imageViewerModal);
  });
  // return the ready HTML element with the filled-in data
  return cardElement;
}

function fillProfileForm(e) {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function addCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  // const cardElement = getCardElement({ name, link });
  // cardListEl.prepend(cardElement);
  renderCard({ name, link }, cardListEl);
  closeModal(addImageModal);
}

function addProfileFormListeners() {
  profileEditButton.addEventListener("click", () => {
    // open modal only upon clicking edit button
    openModal(profileEditModal);
    //form is prefilled with existing content instead of generic placeholders
    fillProfileForm();
    console.log("form opened and possibly edited");
  });
  // close the modal if no changes are desired
  profileEditModalCloseButton.addEventListener("click", () => {
    closeModal(profileEditModal);
  });
  // save and close the modified profile info
  profileEditForm.addEventListener("submit", handleProfileEditSubmit);
}

function addNewCardListeners() {
  addNewCardButton.addEventListener("click", () => {
    openModal(addImageModal);
  });
  // close the modal if no changes are desired
  imageModalCloseButton.addEventListener("click", () => {
    closeModal(addImageModal);
  });
  // save form info and close to show a new card
  addNewCardForm.addEventListener("submit", addCardFormSubmit);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// Loops
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// Call functions needed upon pageload
addProfileFormListeners();
addNewCardListeners();

imageViewerModalCloseButton.addEventListener("click", () => {
  closeModal(imageViewerModal);
  // clears list to prevent next click from appending more images to modal
  const imageViewerModalContents =
    imageViewerModalContainer.querySelector(".image-viewer");
  imageViewerModalContents.remove();
});
