// NavBar.js
import { Layout } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import Hambergers from "./Hamberger";
import Hamburger from "hamburger-react";

const NavBar = () => {
  const [isOpenHamberger, setIsOpenHamberger] = useState(false);

  const { Header } = Layout;

  const handleHamburgerClick = () => {
    setIsOpenHamberger(!isOpenHamberger);
  };

  const handleOutsideClick = () => {
    setIsOpenHamberger(false);
  };

  return (
    <>
      <Layout className="layout">
        <Header
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={handleOutsideClick}
        >
          <div className="logo" style={{ color: "white" }}>
            <Link to="/">
              <img
                src="heng.jpg"
                alt="heng"
                height={50}
                width={47}
                className="bgimg"
              />
            </Link>
          </div>
          <div className="Hamburgericon" onClick={(e) => e.stopPropagation()}>
            <Hamburger
              color="#d9d9d9"
              toggled={isOpenHamberger}
              toggle={handleHamburgerClick}
            />
          </div>
        </Header>
      </Layout>
      {isOpenHamberger && <Hambergers onClose={handleHamburgerClick} />}
    </>
  );
};

export default NavBar;
