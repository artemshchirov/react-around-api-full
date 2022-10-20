export const baseUrl = 'https://around.backend.nomoredomains.sbs';
const authorization = localStorage.getItem('jwt');

const handleResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`код ${response.status}`);

export const register = (email, password) =>
  fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then(handleResponse);

export const authorize = (email, password) =>
  fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then(handleResponse);

export const getContent = (jwt) =>
  fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }
  }).then(handleResponse);
