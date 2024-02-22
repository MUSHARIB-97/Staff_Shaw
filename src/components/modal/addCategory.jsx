import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import InputComponnet from "../input";
import { categoryServices } from "../../services/category.services";
import { addCategory } from "../../redux-store/features/categorySlice";

// Form Validation
const validationSchema = yup.object({
  name: yup.string().required("Category Name is required"),
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

const AddCategoryModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
  };

  const handleClose = () => setOpen(false);

  const onSubmit = async (value) => {
    try {
      let body = {
        name: value.name,
      };
      let response = await categoryServices.addCategory(body);
      dispatch(addCategory(response.data));
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
        <h2>Add New Category</h2>
        <button onClick={handleClose}>X</button>
      </div>

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
          <button type="submit">Create Category</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
