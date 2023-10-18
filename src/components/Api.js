class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    // console.log("in getUseInfo");
    // console.log(this._baseURL, this._headers);
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  addNewCard(inputValues) {
    // console.log("addNewCard", inputValues);
    // this._headers["Content-Type"] = "application/json";
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link,
      }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  deleteCard(cardId) {
    console.log("deleteCard", cardId);
    // this._headers["Content-Type"] = "application/json";
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  // deleteCard(inputValues) {
  //   console.log("deleteCard", inputValues);
  //   // this._headers["Content-Type"] = "application/json";
  //   return fetch(`${this._baseURL}/cards/${inputValues}`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then((res) => {
  //     return this._checkServerResponse(res);
  //   });
  // }

  updateUserInfo(inputValues) {
    console.log("updateUserInfo", inputValues);
    const inputValuesName = inputValues.title;
    const inputValuesAbout = inputValues.about;

    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValuesName,
        about: inputValuesAbout,
      }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }
}

export default Api;
