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

export { handleEscKey, handleClickAway, openPopup, closePopup };
