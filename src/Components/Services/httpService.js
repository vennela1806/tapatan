import axios from "axios";
import logger from "./logServices";

axios.interceptors.response.use(null, (error) => {
  const expectedEroor =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedEroor) {
    logger.log(error);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
  axios.defaults.headers.common["Content-type"] = "application/json";
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
