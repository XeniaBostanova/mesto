export default class UserInfo {
  constructor({name, job, avatar}) {
    this._profileTitle = document.querySelector(name);
    this._profileCaption = document.querySelector(job);
    this._profileAvatar = document.querySelector(avatar);
  }

  getUserInfo() {

    this._userInfo = {
      name: this._profileTitle.textContent,
      job: this._profileCaption.textContent
    }

    return this._userInfo;
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.name;
    this._profileCaption.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }

}
