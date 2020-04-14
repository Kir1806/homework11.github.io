export default class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;

    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                authorization: this.headers.authorization //'63c8c2ff-8bbb-47e7-921b-c11d100153b9'
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
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
              authorization: this.headers.authorization //'63c8c2ff-8bbb-47e7-921b-c11d100153b9'
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
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.headers.authorization,
          'Content-Type': this.headers['Content-Type']
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