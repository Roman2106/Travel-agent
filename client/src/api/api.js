const checkOk = response =>{
if (response.ok){
	if (response.status !==200){
		throw new Error("Some problems");
	}
		return response.json();
	}else{
		throw new Error("Network problems");
	}
}

const makeRequestWithBody = (url, method, bodyObject) =>{
	const body = JSON.stringify(bodyObject);
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	return fetch (url, {method, body, headers}).then(checkOk);
};

export const getAll = (entityType, id) => fetch(`/api/${entityType}`).then(checkOk);
export const getById = (entityType, id) => fetch(`/api/${entityType}/${id}`).then(checkOk);
export const remove = (entityType, id) => fetch(`/api/${entityType}/${id}`, {method: "DELETE"}).then(checkOk);
export const update = (entityType, id, object) => 
	makeRequestWithBody(`/api/${entityType}/${id}`, "PUT", object);
export const add = (entityType, object) => 
	makeRequestWithBody(`/api/${entityType}`, "POST", object);
