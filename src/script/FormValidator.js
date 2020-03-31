class FormValidator {
    constructor(form, formUser, popupUserSaveButton) {// nameEvent, form
        this.form = form;
        this.formUser = formUser;
        this.popupUserSaveButton = popupUserSaveButton;
    }

  checkInputValidity(element, errorElement) {

        if (element.validity.valueMissing) {
            errorElement.textContent = 'Это обязательное поле';
            errorElement.classList.add('error_is-activ');
            return false;
        }
        if (element.validity.tooShort && !element.validity.typeMismatch) {
              errorElement.textContent = 'Должно быть от 2 до 30 символов';
              errorElement.classList.add('error_is-activ');
              return false;
        }
        if(element.validity.typeMismatch) {
              errorElement.textContent = 'Введите ссылку формата https://www.***.***.**'
              errorElement.classList.add('error_is-activ');
              return false;
        }
            errorElement.classList.remove('error_is-activ');
            return true;
    }

    setSubmitButtonState(event) {
      
        const element = event.target;
        this.popupAddButton = document.querySelector('.button.popup__button');
        const errorElement = document.querySelector(`#error-${element.id}`);        

        if(element.validity.valid === false || element.value.length === 0) {
          this.popupUserSaveButton.setAttribute('disabled', true);
          this.popupAddButton.setAttribute('disabled', true);
          this.popupUserSaveButton.classList.add('popup-user__button-disabled');
          this.popupAddButton.classList.add('popup__button-disabled');
          return this.checkInputValidity (element, errorElement);
        }

        if (username.validity.valid && aboutuser.validity.valid) {
          this.popupUserSaveButton.removeAttribute('disabled');
          this.popupUserSaveButton.classList.remove('popup-user__button-disabled');
        }

        if(place.validity.valid && placelink.validity.valid) {
          this.popupAddButton.removeAttribute('disabled');
          this.popupAddButton.classList.remove('popup__button-disabled');
        }
        return this.checkInputValidity (element, errorElement);
    }

    setEventListeners(form) {
        //console.log('привязывание слушателей');
        event.preventDefault();
        const inputs = Array.from(form.elements);//массив инпутов
        inputs.forEach((elem) => {
          if (elem.id !== submit.id) {         
            elem.addEventListener('input', () => this.checkInputValidity);
            elem.addEventListener('input', (event) => this.setSubmitButtonState(event));
          }
        });
    }
}
