import authToken from "./authToken";
import history from "../history";

const checkOk = response => {
  if (response.ok) {
    if (response.status !== 200) {
      throw new Error("Some Error.");
    }
    return response.json();
  } else {
    if (response.status === 401) {
      history.replace("/login");
      throw new Error("Invalid password or login!");
    }
    throw new Error("Invalid password or login!");
  }
};

export const makeRequestWithBody = (url, method = "GET", bodyObject) => {
  const headers = new Headers();
  const token = authToken.get();
  const params = {
    method,
    headers
  };
  if (token) {
    headers.append("Authorization", `Bearer ${token}`)
  }
  if (bodyObject) {
    headers.append("Content-Type", "application/json");
    params.body = JSON.stringify(bodyObject);
  }
  return fetch(url, params).then(checkOk);
};

export const getAll = (entityType, id) => makeRequestWithBody(`/api/${entityType}`);
// export const getById = (entityType, id) => fetch(`/api/${entityType}/${id}`).then(checkOk);
export const remove = (entityType, id) => makeRequestWithBody(`/api/${entityType}/${id}`, "DELETE");
export const update = (entityType, id, object) =>
  makeRequestWithBody(`/api/${entityType}/${id}`, "PUT", object);
export const add = (entityType, object) =>
  makeRequestWithBody(`/api/${entityType}`, "POST", object);
