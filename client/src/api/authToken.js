const storageKey = 'auth_token';

class TokenStorage {
  get() {
    return localStorage.getItem(storageKey);
  }

  set(token) {
    localStorage.setItem(storageKey, token);
  }

  clear() {
    localStorage.removeItem(storageKey);
  }
}

export default new TokenStorage();