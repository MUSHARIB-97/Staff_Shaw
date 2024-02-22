import React, { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "../layout/homeLayout";

const IndexPage = lazy(() => import("../pages/home"));
// Category Pages
const CategoryPage = lazy(() => import("../pages/category"));
const EditCategoryPage = lazy(() => import("../pages/category/editCategory"));

// Product Pages
const ProductPage = lazy(() => import("../pages/product"));
const EditProductPage = lazy(() => import("../pages/product/editProduct"));

const LoadingFallBack = () => {
  return (
    <>
      <div>
        <h1>Loading...</h1>
      </div>
    </>
  );
};

const Routes = () => {
  return useRoutes([
    {
      element: (
        <Suspense fallback={<LoadingFallBack />}>
          <HomeLayout>
            <Outlet />
          </HomeLayout>
        </Suspense>
      ),

      children: [
        { path: "/", element: <IndexPage />, index: true },
        { path: "category", element: <CategoryPage /> },
        { path: "category/edit-category/:id", element: <EditCategoryPage /> },
        { path: "product", element: <ProductPage /> },
        { path: "product/edit-product/:id", element: <EditProductPage /> },
      ],
    },

    { path: "*", element: <Navigate to="/" /> },
  ]);
};

export default Routes;
