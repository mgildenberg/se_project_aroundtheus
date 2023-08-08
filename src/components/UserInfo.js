export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileTitle = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._name = this._profileTitle.textContent;
    this._job = this._profileDescription.textContent;
    return { name: this._name, job: this._job };
  }

  setUserInfo() {
    this._profileTitleInput = document.querySelector("#profile-title-input");
    this._profileDescriptionInput = document.querySelector(
      "#profile-description-input"
    );
    this._profileTitle.textContent = this._profileTitleInput.value;
    this._profileDescription.textContent = this._profileDescriptionInput.value;
  }
}
