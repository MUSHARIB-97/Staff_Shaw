import request from "../config/axios.config";

function getCategories() {
  return request
    .get("/get/category")
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("get categories error=>", error);
      throw error;
    });
}

function getCategory(id) {
  return request
    .get(`/edit/category/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("get category error=>", error);
      throw error;
    });
}

function addCategory(body) {
  return request
    .post("/add/category", body)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("add category error=>", error);
      throw error;
    });
}

function updateCategory(id, body) {
  return request
    .put(`/update/category/${id}`, body)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("update category error=>", error);
      throw error;
    });
}

function deleteCategory(id) {
  return request
    .delete(`delete/category/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log("get category error=>", error);
      throw error;
    });
}

export const categoryServices = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
