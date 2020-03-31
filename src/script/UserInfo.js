export default class UserInfo {
    constructor(userName, userJob, userPhoto, newUserName, newAboutUser, api, popUp) {
        this.api = api;
        this.popUp = popUp;
        this.userName = userName;
        this.userJob = userJob;
        this.userPhoto = userPhoto;
        this.newUserName = newUserName;
        this.newAboutUser = newAboutUser;
    }


    setUserInfo() {
        //event.preventDefault();
        this.api.getUserInfo()
            .then((result) => {

                this.result = result;
                this.userName.textContent = this.result.name;
                this.userJob.textContent = this.result.about;
                this.userPhoto.style.backgroundImage = this.result.avatar;
            });
    }

    updateUserInfo() {

        this.api.postUserInfo(this.newUserName.value, this.newAboutUser.value)
        .then((result) => {
            this.result = result;
            this.userName.textContent = this.result.name;
            this.userJob.textContent = this.result.about;
            this.popUp.close('closeEditUserProfileData');
        })
        .catch(error => {
            console.log(`Ошибка ввода данных - ${error}`);
    });
    }
}