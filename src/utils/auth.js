export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Error! ${res.statusText}`));
};

const request = (url, options) => {
    return fetch(url, options).then(checkResponse);
};

export const register = (email, password) => {
    return request(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

export const login = (email, password) => {
    return request(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then((data) => {
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('email', email);
        return data;
    });
};

export const checkToken = (token) => {
    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res);
};
