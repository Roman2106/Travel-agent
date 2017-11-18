import {makeRequestWithBody} from "./api";
import authToken from "./authToken";

export const login = loginInfo => makeRequestWithBody("/auth/login", "POST", loginInfo).then(({token}) => {
  if (loginInfo.password && loginInfo.password !== "") {
    authToken.set(token);
  }
  return new Error("Invalid login or password.");
}).catch(() => {
  throw new Error("Invalid login or password.");
});