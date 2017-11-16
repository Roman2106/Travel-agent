const storageKey = "auth_token";

class TokenStorage {

  get() {
    return localStorage.getItem(storageKey);
  }

  set() {
    localStorage.setItem(storageKey, token);
  }

  clear() {
    localStorage.removeItem(storageKey);
  }

}

export default new TokenStorage();