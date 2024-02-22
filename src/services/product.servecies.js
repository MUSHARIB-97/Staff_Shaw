import request from "../config/axios.config";

function getProducts() {
  return request
    .get("/products")
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("get categories error=>", error);
      throw error;
    });
}

function getProduct(id) {
  return request
    .get(`/products/${id}/edit`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("get category error=>", error);
      throw error;
    });
}

function addProduct(body) {
  return request
    .post("/add/products", body)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("add category error=>", error);
      throw error;
    });
}

function updateProduct(id, body) {
  return request
    .put(`/products/${id}/update`, body)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("update category error=>", error);
      throw error;
    });
}

function deletProduct(id) {
  return request
    .delete(`products/${id}/delete`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("get category error=>", error);
      throw error;
    });
}

export const productServices = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deletProduct,
};
