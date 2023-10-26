import http from "./httpService";
import jwtDecode from "jwt-decode";
import apiUrl from "../../config.json";
import helpers from "./cryptos";

const tokenKey = "token";
const apiEndpoint = process.env.REACT_APP_API_URL;

http.setJwt(getJwt());

export function getCurrentUser() {
  try {
    const encjwt = localStorage.getItem(tokenKey);
    const jwt = helpers.decryptobj(encjwt);

    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export async function login(email, password) {
  const loginObj = { email, password };
  console.log(loginObj);
  const drreqpob = helpers.encryptobj(loginObj);
  const data = await http.post(apiEndpoint + "/user/login", {
    enc: drreqpob,
  });
  console.log(data);
  localStorage.setItem(tokenKey, data.data);
  http.setJwt(getJwt());

  console.log(helpers.decryptobj(data.data));
  return data.data;
}

export async function register(
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) {
  const regObj = { firstName, lastName, email, password, confirmPassword };
  const drreqpob = helpers.encryptobj(regObj);
  const data = await http.post(apiEndpoint + "/user/register", {
    enc: drreqpob,
  });
  console.log(data);
  var dd = helpers.decryptobj(data.data);
  console.log(dd);
}

export default {
  login,
  register,
  getCurrentUser,
  logout,
  getJwt,
};
