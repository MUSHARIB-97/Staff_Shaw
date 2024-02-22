//Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import logo from "./../../assets/logo.gif";

const Header = ({ children }) => {
  return (
    <div className="container">
      {/* {children} */}

      <div className="sideNav">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="types">
          <p>
            <Link to="/category">Categories</Link>
          </p>
          <Link to="/product">Products</Link>
        </div>
      </div>
      <div className="topNav">
        {/* <p className="text-3xl font-bold underline text-red-500">Home</p> */}
      </div>
    </div>
  );
};

export default Header;
