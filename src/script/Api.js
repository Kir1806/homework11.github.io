export default class Api {
    constructor(options) {
        this.options = options;

    }

    getInitialCards() {
        return fetch('https://praktikum.tk/cohort8/cards', {
            headers: {
                authorization: '63c8c2ff-8bbb-47e7-921b-c11d100153b9'
                }
                })
                .then(res => {
                    if(res.ok) return res.json();
                    return Promise.reject(res.status);
                })

                .then((data) => {
                  return data;
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });

    }

    getUserInfo(){// запрос информации с сервера
        return fetch('https://praktikum.tk/cohort8/users/me', {
            headers: {
              authorization: '63c8c2ff-8bbb-47e7-921b-c11d100153b9'
            }
          })
            .then(res => {
              if(res.ok) return res.json()
              return Promise.reject(res.status);
            })
            .then((result) => {
              return result;
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
    }

    postUserInfo(userName, userAbout){ // передача на сервер информации name, job
      return fetch('https://praktikum.tk/cohort8/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '63c8c2ff-8bbb-47e7-921b-c11d100153b9',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: userName, about: userAbout})
          })
          .then((res) => {
            if(res.ok) return res.json();
              return Promise.reject(res.status);
            })
            .then((res) =>{
              return res;
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
    }
}