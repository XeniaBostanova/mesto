export default class UserInfo {
  constructor({name, job}) {
    this._profileTitleSelector = document.querySelector(name);
    this._profileCaptionSelector = document.querySelector(job);
  }

  getUserInfo() {

    this._userInfo = {
      name: this._profileTitleSelector.textContent,
      job: this._profileCaptionSelector.textContent
    }

    return this._userInfo;
  }

  setUserInfo(data) {
    this._profileTitleSelector.textContent = data.name;
    this._profileCaptionSelector.textContent = data.about;
  }
}
