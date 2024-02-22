import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import InputComponnet from "../input";
import { productServices } from "../../services/product.servecies";
import { addProduct } from "../../redux-store/features/productSlice";

// Form Validation
const validationSchema = yup.object({
  name: yup.string().required("Product Name is required"),
  category_id: yup.string().required("Please Select Category"),
  price: yup.string().required("Product Price is required"),
});

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddProductModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  const initialState = {
    name: "",
    category_id: "",
    price: "0",
  };

  const handleClose = () => setOpen(false);

  const onSubmit = async (values) => {
    try {
      let response = await productServices.addProduct({
        ...values,
        price: values.price.toString(),
        slug: values.name.toLowerCase(),
      });
      dispatch(addProduct(response.data));
      formik.resetForm();
      handleClose();
    } catch (error) {
      console.log("Getting errro", error);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (value) => onSubmit(value),
  });

  const { handleChange, handleSubmit, touched, errors, values } = formik;

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        className="modal-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Add New Product</h2>
        <button onClick={handleClose}>X</button>
      </div>

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
          <button type="submit">Create Product</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
