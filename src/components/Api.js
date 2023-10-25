class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  addNewCard(inputValues) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link,
      }),
    }).then(this._checkServerResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  updateUserInfo(userInfo) {
    const userInfoName = userInfo.title;
    const userInfoAbout = userInfo.about;

    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfoName,
        about: userInfoAbout,
      }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  updateAvatar(avatarInfo) {
    const avatarInfoLink = avatarInfo.link;
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarInfoLink,
      }),
    }).then(this._checkServerResponse);
  }

  addLike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkServerResponse);
  }
}

export default Api;
