export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileTitle = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(jobSelector);
  }

  getUserInfo() {
    // console.log(this._profileTitle.textContent);
    this._name = this._profileTitle.textContent;
    this._job = this._profileDescription.textContent;
    return { name: this._name, job: this._job };
  }

  setUserInfo(inputValues) {
    console.log(inputValues);
    this._profileTitle.textContent = inputValues.title;
    this._profileDescription.textContent = inputValues.about;
  }
}
