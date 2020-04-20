import './style.css';
import Api from './script/Api.js';
import Card from './script/Card.js';
import CardList from './script/CardList.js';
import FormValidator from './script/FormValidator.js';
import Popup from './script/Popup.js';
import UserInfo from './script/UserInfo.js';

(function (){
const root = document.querySelector('.root');
const cardSection = root.querySelector('.places-list.root__section');
const addCardButton = root.querySelector('.button.user-info__button');//кнопка добавления карточки
const editUserProfile = root.querySelector('.user-edit__button');//кнопка редактирования профиля
const newCardPopupCloseButton = root.querySelector('.popup__close');//кнопка закрытия попапа добавления карточки
const userProfilePopupCloseButton = root.querySelector('.popup-user__close');//кнопка закрытия редактирования профиля
const cardImagePopupCloseButton = root.querySelector('.popup-image__close');// кнопка закрытия попапа картинки
const popupAddButton = root.querySelector('.button.popup__button');// кнопка добавления карточки в попапе
const popupUserSaveButton = root.querySelector('.button.popup__button.popup-user__button.popup-user__button-disabled'); // кнопка сохранения данных профиля
const cardImagePopup = root.querySelector('.place-card__image');// пропап картинки

//const popupImage = root.querySelector('.popup-image');
const popup = root.querySelector('.popup');
const popupErrorPlaceElement = root.querySelector('.popup__error-name.error_is-activ');
const popupErrorPlaceLinkElement = root.querySelector('.popup__error-link.error_is-activ');
const popupUserProfile = root.querySelector('.popup-user');

const newUserName = document.querySelector('.popup__input.popup-user__input-type-name');
const newAboutUser = document.querySelector('.popup__input.popup-user__input-type-about');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userPhoto = root.querySelector('.user-info__photo'); // avatar пользователя

const name = document.querySelector('.popup__input.popup__input_type_name');
const link = document.querySelector('.popup__input.popup__input_type_link-url');

const form = document.forms.new;
const formUser = document.forms.edituser;
console.log(process.env.NODE_ENV);
// 63c8c2ff-8bbb-47e7-921b-c11d100153b9
// cohort8
// GET https://praktikum.tk/cohortId/users/me

const  initialCards = [];

const api = new Api({
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '63c8c2ff-8bbb-47e7-921b-c11d100153b9',
      'Content-Type': 'application/json'
    }
  });

const formValidator = new FormValidator(form, formUser, popupUserSaveButton);

const card = new Card(name, link);

const cards = new CardList(root.querySelector('.places-list.root__section'), initialCards, card, api);

const popUp = new Popup(popup, popupAddButton, newUserName, newAboutUser, userName, userJob, popupUserSaveButton, popupUserProfile, formValidator, form, formUser, popupErrorPlaceElement, popupErrorPlaceLinkElement);

const userInfo = new UserInfo(userName, userJob, userPhoto, newUserName, newAboutUser, api, popUp);

userInfo.setUserInfo(); // загрузка информации о пользоватаеле с сервера

cards.render(); // загрузка первоначальных карточек с сервера, бывший getFirstCard

cardSection.addEventListener('click', (event) => cards.changeCard(event)); // лайк и удаление карточки
cardSection.addEventListener('click', popUp.open); // вызов всплывающего окна с картинкой
addCardButton.addEventListener('click', (event) => popUp.open(event)); //вызов всплывающего окна добавления картинки
editUserProfile.addEventListener('click', (event) => popUp.open(event)); // вызов всплывающего окна редактирования профиля

newCardPopupCloseButton.addEventListener('click', (event) => popUp.close(event)); // закрытие всплывающего окна добавления картинки
userProfilePopupCloseButton.addEventListener('click', (event) => popUp.close(event)); // закрытие всплывающего окна редактирования профиля
cardImagePopupCloseButton.addEventListener('click', popUp.close); //закрытие всплывающего окна с картинкой

form.addEventListener('submit', function(event) {// добавление карточки вручную
  event.preventDefault();
  cards.addCard(name.value, link.value);
  form.reset();
  popUp.close('closeAddCard');
});

formUser.addEventListener('submit',  function(event) {// редактирование информации о пользователе
  event.preventDefault();
  userInfo.updateUserInfo();
});

}());
