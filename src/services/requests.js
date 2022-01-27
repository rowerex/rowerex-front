export const BASE_URL = "http://localhost:8080/api";

const createUrl = (base, path) => `${base}${path}`;

export const getBikes = () => [
  createUrl(BASE_URL, "/bikes/karol"),
  {
    method: "GET",
  }
];
