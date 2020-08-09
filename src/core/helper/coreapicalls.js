import { API } from "../../backend";

console.log('API')
//get all the products
export const getProducts = () => {
  return fetch(`${API}products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
