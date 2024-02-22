import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { productLists } from "../../redux-store/features/productSlice";
import { categoryLists } from "../../redux-store/features/categorySlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productLists());
    dispatch(categoryLists());
  }, []);

  return (
    <div>
      <h2>StaffShaw PVT LTD </h2>
    </div>
  );
};

export default Home;
