// Product.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  productLists,
  removeProduct,
} from "../../redux-store/features/productSlice";
import { productServices } from "../../services/product.servecies";

import TableComponent from "../../components/table";
import AddProductModal from "../../components/modal/addProduct";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(productLists());
  }, []);

  const [addProduct, setAddProduct] = useState(false);

  const columns = [
    {
      Header: "SR #",
      accessor: "sr",
    },
    {
      Header: "Product Name",
      accessor: "name",
    },
    {
      Header: "Category",
      accessor: "categoryName",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Action",
      // Render a "Show" button in each row
      Cell: ({ row }) => {
        return (
          <>
            <button onClick={() => handleEditProduct(row.id)}>Edit</button>
            <button onClick={() => handleDeleteProduct(row.id)}>Delete</button>
          </>
        );
      },
    },
  ];

  const rows = products?.map((product, index) => ({
    sr: index + 1,
    categoryName: product?.category?.name,
    ...product,
  }));

  const handleDeleteProduct = async (id) => {
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
          let response = await productServices.deletProduct(id);
          dispatch(removeProduct(id));
        } catch (error) {
          console.log("error on delete ", error);
        }
      }
    });
  };

  const handleEditProduct = (id) => {
    navigate(`/product/edit-product/${id}`);
  };

  return (
    <div
      style={{
        width: "90%",
        height: "90%",
      }}
    >
      <TableComponent columns={columns} data={rows} />

      {addProduct && (
        <AddProductModal open={addProduct} setOpen={setAddProduct} />
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
          onClick={() => setAddProduct(true)}
          style={{
            backgroundColor: "transparent",
            padding: "10px",
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Product;
