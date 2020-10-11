export class Api{
    constructor(options){
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }



    getInitialCards(){
       return fetch(`${this.baseUrl}/cards`, {headers: this.headers})
       .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)).catch(err => console.log(`Загрузка карточек: ${err}`));
    }

    getUserInfo(){
        return fetch(`${this.baseUrl}/users/me`, {headers: this.headers})
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          }).catch(err => console.log(`Загрузка информации о пользователе: ${err}`))
      }

    changeProfileInfo(input){
      return fetch(`${this.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: input.author,
          about: input.about
        })
      }
      )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch(err => console.log(`Изменение информации: ${err}`));
    }


    addNewCard(input){
      return fetch(`${this.baseUrl}/cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: input.name,
          link: input.link
        })
      }
      )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch(err => console.log(`Добавление карточки: ${err}`));
    }

    putLike(cardId){
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{method: 'PUT', headers: this.headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch(err => console.log(`Лайк: ${err}`));
    }

    deleteLike(cardId){
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{method: 'DELETE', headers: this.headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch(err => console.log(`Дизлайк: ${err}`));
    }

    changeAvatar(input){
      return fetch(`${this.baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: input.avatar
        })
      }
      )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch(err => console.log(`Аватар: ${err}`));
    }

    deleteCard(cardId){
      return fetch(`${this.baseUrl}/cards/${cardId}`, {method: 'DELETE', headers: this.headers})
       .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }).catch(err => console.log(`Удаление: ${err}`));
    }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '624c4e77-b79e-4ce9-9f2d-48e259657516',
    'Content-Type': 'application/json'
  }
});

export default api