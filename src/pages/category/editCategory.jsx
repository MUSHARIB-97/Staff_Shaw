import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { updateCategory } from "../../redux-store/features/categorySlice";
import { categoryServices } from "../../services/category.services";
import InputComponnet from "../../components/input";

// Form Validation
const validationSchema = yup.object({
  name: yup.string().required("Category Name is required"),
});

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [originalInput, setOriginalInput] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await categoryServices.getCategory(id);
        setOriginalInput(response.data);
        formik.setValues({
          name: response.data.name,
        });
      } catch (error) {
        console.log("getting or ==> ", error);
      }
    };

    fetchData();
  }, [id]);

  const initialState = {
    name: "",
  };

  const getUpdatedFields = (currentInput) => {
    const updatedFields = {};
    for (const key in currentInput) {
      if (currentInput[key] !== originalInput[key]) {
        updatedFields[key] = currentInput[key];
      }
    }

    return updatedFields;
  };

  const onSubmit = async (values) => {
    try {
      const updatedFields = getUpdatedFields(values);

      if (Object.keys(updatedFields).length > 0) {
        let response = await categoryServices.updateCategory(id, updatedFields);
        dispatch(updateCategory(response.data));
        navigate("/category");
      }
    } catch (error) {
      console.log("Getting error on edit! ", error);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (value) => onSubmit(value),
  });

  const { handleChange, handleSubmit, touched, errors, values } = formik;

  return (
    <div>
      <h1>Edit Category</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <InputComponnet
            label="Category Name:"
            placeholder="Enter Catory Name"
            name="name"
            value={values.name}
            onChangeText={handleChange}
            error={errors.name}
            onBlur={touched.name}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button type="submit">Update Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
