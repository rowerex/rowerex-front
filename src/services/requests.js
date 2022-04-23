export const BASE_URL = process.env.REACT_APP_BACKENDURL;


const createUrl = (base, path) => `${base}${path}`;

export const getBikes = () => [
  createUrl(BASE_URL, "/bikes"),
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

