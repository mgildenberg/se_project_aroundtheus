export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._profileTitle = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(jobSelector);
    // this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._name = this._profileTitle.textContent;
    this._job = this._profileDescription.textContent;
    return { name: this._name, job: this._job };
  }

  setUserInfo(inputValues) {
    this._profileTitle.textContent = inputValues.title;
    this._profileDescription.textContent = inputValues.about;
  }

  // setUserAvatar(avatar) {
  //   console.log(this._avatarElement);
  //   this._avatarElement.src = avatar;
  //   this._avatarElement.alt = this._profileTitle.textContent;
  // }
}
