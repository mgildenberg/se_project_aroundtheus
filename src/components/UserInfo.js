export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileTitle = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._name = this._profileTitle.textContent;
    this._job = this._profileDescription.textContent;
    console.log({ name: this._name, job: this._job });
    return { name: this._name, job: this._job };
  }

  setUserInfo(inputValues) {
    this._profileTitle.textContent = inputValues.title;
    this._profileDescription.textContent = inputValues.about;
  }
}
