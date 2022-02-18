export const BASE_URL = "http://localhost:8080/api";

const createUrl = (base, path) => `${base}${path}`;

export const getBikes = () => [
  createUrl(BASE_URL, "/bikes"),
  {
    method: "GET",
  }
];

export const getParts = () => [
  createUrl(BASE_URL, "/parts"),
  {
    method: "GET",
  }
];

export const postLogin = (credentials) => [
  createUrl(BASE_URL, "/login"),
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
  }
];

export const postPart = (newPart) => [
  createUrl(BASE_URL, "/parts"),
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPart),
  }
];
