import React from "react";
import "./homeLayout.css";

import logo from "./../assets/logo.gif";
import { Link } from "react-router-dom";

const HomeLayout = ({ children }) => {
  return (
    <div className="container">
      {/* side nav */}
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
      {/* main container */}
      <div className="main-container">
        {/* top nav */}
        <div className="top-nav">
          <div className="types">
            <p>
              <Link to={"/"}>Home</Link>
            </p>
            <p>
              <Link to="/category">Categories</Link>
            </p>
            <Link to="/product">Products</Link>
          </div>
        </div>
        {/* container childerer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            // backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
