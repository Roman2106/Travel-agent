import {makeRequestWithBody} from "./api";
import authToken from "./authToken";

export const login = loginInfo => makeRequestWithBody("/auth/login", "POST", loginInfo).then(({token}) => {
  authToken.set(token);
});