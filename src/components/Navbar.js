import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// NAV BAR CSS
import "../css/Navbar.css";
// NAVBAR COMPONENT
const Navbar = ({ numOfCartItems }) => {
  return (
    <div className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container-fluid">
        {/* HOME PAGE LINK */}
        <Link id="home_link" className="navbar-brand" to="/">
          eCommerce
        </Link>
        <div className=" navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item nav-link active">
              {/* LIST OF PRODUCT LINK */}
              <Link className="navbar-brand" to="products">
                Products
              </Link>
            </li>
            <li className="nav-item nav-link active">
              {" "}
              {/* ADD NEW PROUDUCT PAGE LINK */}
              <Link className="navbar-brand" to="/new">
                Add a Product <i className="fas fa-folder-plus"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {/* CART PAGE ICON/LINK */}
        <Link className="navbar-brand" to="/cartComponent">
          <i className="fas fa-cart-plus"></i>
          <span>{numOfCartItems}</span>
        </Link>
      </div>
    </div>
  );
};

// MAPPING STATE FUNCTION

const mapStateToProps = (state) => {
  return {
    numOfCartItems: state.cart.length,
  };
};

// CONNECTING STATE TO THE COMPONET

export default connect(mapStateToProps)(Navbar);
