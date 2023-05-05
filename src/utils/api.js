class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // check response status
    // eslint-disable-next-line class-methods-use-this
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Error! ${res.statusText}`));
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    // load user info from server
    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
    }

    // load cards from server
    getCardList() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers,
        });
    }

    // Wait for the getCardList and getUserInfo before rendering
    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getCardList()]);
    }

    // edit profile
    setUserInfo({ name, about }) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        });
    }

    // add new card
    addCard({ name, link }) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        });
    }

    // delete a card
    removeCard(cardID) {
        return this._request(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    // add like
    addLike(cardID) {
        return this._request(`${this._baseUrl}/cards/likes/${cardID}`, {
            method: 'PUT',
            headers: this._headers,
        });
    }

    // remove like
    removeLike(cardID) {
        return this._request(`${this._baseUrl}/cards/likes/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    changeLikeCardStatus(cardID, isLiked) {
        return isLiked ? this.addLike(cardID) : this.removeLike(cardID);
    }

    // update profile pic
    setProfilePicture({ avatar }) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        });
    }
}

// API instance
const api = new Api({
    baseUrl: 'https://around.nomoreparties.co/v1/group-7',
    headers: {
        authorization: '7c54637c-526f-4047-8439-3339585d598e',
        'Content-Type': 'application/json',
    },
});

export default api;
