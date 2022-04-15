 // export const BASE_URL = "http://localhost:8080/api";
export const BASE_URL = process.env.REACT_APP_BACKENDURL;


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

export const getTypes = () => [
  createUrl(BASE_URL, "/types"),
  {
    method: "GET",
  }
];

export const getModels = () => [
  createUrl(BASE_URL, "/models?type="),
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
