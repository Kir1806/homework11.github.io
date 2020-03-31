export default class Popup {
    constructor(popup, popupAddButton, newUserName, newAboutUser, userName, userJob, popupUserSaveButton, popupUserProfile, formValidator, form, formUser, popupErrorPlaceElement, popupErrorPlaceLinkElement) {
        this.popup = popup;
        this.popupAddButton = popupAddButton;
        this.newUserName = newUserName;
        this.newAboutUser = newAboutUser;
        this.userName = userName;
        this.userJob = userJob;
        this.popupUserSaveButton = popupUserSaveButton;
        this.popupUserProfile = popupUserProfile;
        this.formValidator = formValidator;
        this.form = form;
        this.formUser = formUser;
        this.popupErrorPlaceElement = popupErrorPlaceElement;
        this.popupErrorPlaceLinkElement = popupErrorPlaceLinkElement;

    }
    open(event) {

      this.errorUserName = document.querySelector('.popup-user__error-username');
      this.errorAboutUser = document.querySelector('.popup-user__error-aboutuser');
      this.name = document.querySelector('.popup__input.popup__input_type_name');
      this.link = document.querySelector('.popup__input.popup__input_type_link-url');

        if(event.target.classList.contains('user-info__button')) { // открытие попапа карточки

            this.name.value = '';
            this.link.value = '';
            this.popup.classList.add('popup_is-opened');
            this.popupAddButton.setAttribute('disabled', true);
            this.formValidator.setEventListeners(this.form);

            } else if(event.target.classList.contains('user-edit__button')) { // открытие попапа профиля юзера
                this.newUserName.value = this.userName.textContent;
                this.newAboutUser.value = this.userJob.textContent;                
                this.errorUserName.textContent = '';
                this.errorAboutUser.textContent = '';
                this.popupUserSaveButton.classList.remove('popup-user__button-disabled');
                this.popupUserSaveButton.removeAttribute('disabled');
                this.popupUserProfile.classList.add('popup-user_is-opened');
                this.formValidator.setEventListeners(this.formUser);

            } else if(event.target.classList.contains('place-card__image')) {
                const popupImage = document.querySelector('.popup-image');
                const backgroundImageValue = event.target.closest('.place-card__image').style.backgroundImage;
                popupImage.classList.add('popup-image_is-opened');
                popupImage.querySelector('.popup-image__item').style.backgroundImage = backgroundImageValue;
            }

    }
    close(nameEvent) {

        if(nameEvent === 'closeAddCard') {
          
            this.popup.classList.remove('popup_is-opened');// было
            this.popupErrorPlaceElement.classList.add('error_is-activ');
            this.popupErrorPlaceLinkElement.classList.add('error_is-activ');
            this.popupErrorPlaceElement.textContent = 'Введите название';
            this.popupErrorPlaceLinkElement.textContent = 'Введите ссылку';
            this.popupAddButton.classList.add('popup__button-disabled');//было
          } else if(nameEvent === 'closeEditUserProfileData') {
            this.popupUserProfile.classList.remove('popup-user_is-opened');
          } else if(nameEvent.target.classList.contains('popup__close')) {
            this.popup.classList.remove('popup_is-opened');
          } else if(nameEvent.target.classList.contains('popup-user__close')) {
            this.popupUserProfile.classList.remove('popup-user_is-opened');
          } else if(nameEvent.target.classList.contains('popup-image__close')) {
            const popupImage = document.querySelector('.popup-image');
            popupImage.classList.remove('popup-image_is-opened');
          }

    }
}
