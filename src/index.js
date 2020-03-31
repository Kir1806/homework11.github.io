import './pages/index.css';
import Api from './script/Api';
import Card from './script/Card';
import CardList from './script/CardList';
import FormValidator from './script/FormValidator';
import Popup from './script/Popup';
import UserInfo from './script/UserInfo';

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

// 63c8c2ff-8bbb-47e7-921b-c11d100153b9
// cohort8
// GET https://praktikum.tk/cohortId/users/me

const  initialCards = [];

const api = new Api({
    baseUrl: 'https://praktikum.tk/cohor8',
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

// выполнено 3 пункта основного задания
//остальное по мере готовности


/*REVIEW. Резюме.

Общение с сервером происходит. Требуется реконструкция структуры запросов и обработки ответов.

Что надо исправить.

1. Преобразовать структуру методов класса Api в соответствии с комментариями, данными в модуле класса Api. ---- выплнил
1.Заносить данные о профиле после их редактирования на страницу только в случае успешного запроса, и ---- выполнил
не из полей формы, а из объекта с данными профиля, который вернёт сервер  (подробности в ревью в этом модуле в обработчике сабмита формы профиля).
5. Преобразовать методы UserInfo для работы с сервером (подробности в ревью в модуле класса UserInfo). ---- выполнил
6. Перенести инструкцию закрытия формы профиля при сабмите в метод then обработки
ответа сервера (подробности в ревью в этом модуле в обработчике сабмита формы профиля).---- выполнил


/*REVIEW2. Резюме2.
Структура работы с сервером преобразована, но не во всём правильно.
Смотрите комментарии по этому поводу в модуле класса UserInfo.
Надо исправить!


REVIEW3. Резюме3.

Ошибки исправлены. Работа с сервером происходит правильно.

Задание принято!


*/