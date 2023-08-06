export default class UserInfo {
    constructor({selectorName, selectorJob, selectorAvatar}) {
        this._name = document.querySelector(selectorName);
        this._job = document.querySelector(selectorJob);
        this._avatar = document.querySelector(selectorAvatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._job.textContent,
            avatar: this._avatar.src
        }
    }

    setUserInfo(data) {
        this._id = data.id;
        this._name.textContent = data.name;
        this._job.textContent = data.about;
        this._avatar.src = data.avatar;
    }
}