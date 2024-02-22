// Category.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  categoryLists,
  removeCategory,
} from "../../redux-store/features/categorySlice";
import { categoryServices } from "../../services/category.services";

import TableComponent from "../../components/table";
import AddCategoryModal from "../../components/modal/addCategory";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(categoryLists());
  }, []);

  const [addCategory, setAddCategory] = useState(false);

  const columns = [
    {
      Header: "SR #",
      accessor: "sr",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Slug",
      accessor: "slug",
    },
    {
      Header: "Action",
      // Render a "Show" button in each row
      Cell: ({ row }) => {
        return (
          <>
            <button onClick={() => handleEditCategory(row.id)}>Edit</button>
            <button onClick={() => handleDeleteCategory(row.id)}>Delete</button>
          </>
        );
      },
    },
  ];

  const rows = categories.map((e, index) => ({
    sr: index + 1,
    ...e,
  }));

  // console.log("categories ==> ", categories);

  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await categoryServices.deleteCategory(id);
          dispatch(removeCategory(id));
        } catch (error) {
          console.log("error on delete ", error);
        }
      }
    });
  };

  const handleEditCategory = (id) => {
    navigate(`/category/edit-category/${id}`);
  };

  return (
    <div
      style={{
        width: "90%",
        height: "90%",
      }}
    >
      <TableComponent columns={columns} data={rows} />

      {addCategory && (
        <AddCategoryModal open={addCategory} setOpen={setAddCategory} />
      )}

      <div
        style={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setAddCategory(true)}
          style={{
            backgroundColor: "transparent",
            padding: "10px",
          }}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default Category;
