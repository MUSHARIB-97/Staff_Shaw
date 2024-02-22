import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { updateProduct } from "../../redux-store/features/productSlice";
import { productServices } from "../../services/product.servecies";
import InputComponnet from "../../components/input";

// Form Validation
const validationSchema = yup.object({
  name: yup.string().required("Product Name is required"),
  slug: yup.string().required("Slug is required"),
  category_id: yup.string().required("Please Select Category"),
  price: yup.string().required("Product Price is required"),
});

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await productServices.getProduct(id);
        formik.setValues(response.product);
      } catch (error) {
        console.log("getting or ==> ", error);
      }
    };

    fetchData();
  }, [id]);

  const initialState = {
    name: "",
    slug: "",
    category_id: "",
    price: "",
  };

  const onSubmit = async (values) => {
    try {
      let response = await productServices.updateProduct(id, {
        ...values,
        price: values.price.toString(),
      });
      dispatch(updateProduct(response.product));
      navigate("/product");
    } catch (error) {
      console.log("Getting error on edit! ", error);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const { handleChange, handleSubmit, touched, errors, values } = formik;

  return (
    <div>
      <h1>Edit Product</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <InputComponnet
            label="Product Name:"
            placeholder="Enter Product Name"
            name="name"
            value={values.name}
            onChangeText={handleChange}
            error={errors.name}
            onBlur={touched.name}
          />

          {/* Select dropdown for categories */}
          <div style={{ marginTop: "10px" }} className="input-container">
            <label className="input-label" htmlFor="category_id">
              Category:
            </label>
            <select
              id="category_id"
              name="category_id"
              value={values.category_id}
              onChange={handleChange}
              className="input-componnet"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && touched.category_id && (
              <div style={{ color: "red" }}>{errors.category_id}</div>
            )}
          </div>

          <InputComponnet
            label="Slug:"
            placeholder="Enter Slug"
            name="slug"
            value={values.slug}
            onChangeText={handleChange}
            error={errors.slug}
            onBlur={touched.slug}
            style={{ marginTop: "10px" }}
          />

          <InputComponnet
            label="Price:"
            placeholder="Enter Product Price"
            name="price"
            type="number"
            value={values.price}
            onChangeText={handleChange}
            error={errors.price}
            onBlur={touched.price}
            style={{ marginTop: "10px" }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button type="submit">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
