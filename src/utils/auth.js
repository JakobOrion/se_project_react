export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) =>
            res.ok
                ? res.json()
                : Promise.reject(new Error(`Error! ${res.statusText}`))
        )
        .catch((err) => console.log(err));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) =>
            res.ok
                ? res.json()
                : Promise.reject(new Error(`Error! ${res.statusText}`))
        )
        .then((data) => {
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('email', email);
            return data;
        })
        .catch((err) => console.log(err));
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) =>
            res.ok
                ? res.json()
                : Promise.reject(new Error(`Error! ${res.statusText}`))
        )
        .then((res) => res)
        .catch((err) => console.log(err));
};
