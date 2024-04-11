import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
        <img className="logo" src= "assets/img/logo.png"  alt="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li> <Link to="/">Product </Link></li>
          <li><Link to="/add-product">Add Product </Link></li>
          {/* <li><Link to="/update-Product">Update Product</Link></li> */}
          <li><Link to="/profile">Profile </Link></li>
          <li><Link onClick={logout} to="/signup">
              Logout <b>({JSON.parse(auth).name})</b></Link>{" "}
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign Up </Link>{" "}</li>
          <li><Link to="/login">Sign In </Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
