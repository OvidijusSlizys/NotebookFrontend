// Sitas failas suvalgo Spring endpointus ir leidzia naudoti funkcijose, pagal metodo pavadinimus
import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/toDoListItems");
};

const create = (data) => {
  return httpClient.post("/toDoListItems", data);
};

const get = (id) => {
  return httpClient.get(`/toDoListItems/${id}`);
};

const update = (data) => {
  return httpClient.post(`/toDoListItems`, data);
};

const remove = (id) => {
  return httpClient.delete(`/toDoListItems/${id}`);
};

export default { getAll, create, get, update, remove };