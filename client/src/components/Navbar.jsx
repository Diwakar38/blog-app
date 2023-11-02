import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=C++">
            <h6>C++</h6>
          </Link>
          <Link className="link" to="/?cat=SQL">
            <h6>SQL</h6>
          </Link>
          <Link className="link" to="/?cat=CP">
            <h6>CP</h6>
          </Link>
          <Link className="link" to="/?cat=JS">
            <h6>JS</h6>
          </Link>
          <Link className="link" to="/?cat=CS">
            <h6>CS</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
