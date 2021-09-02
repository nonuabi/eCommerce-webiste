import React from "react";
import { connect } from "react-redux";
//DELETE PRODUCT ACTION
import { deleteProductFromCart } from "../redux/posts/postAction";

// CART CONTAINER COMPONENT
const CartContainer = ({ cart, deleteProductFromCart }) => {
  return (
    <div className="cart_container">
      <h2>Cart Items</h2>
      {/* ITERATING OVER CART ARRAY  */}
      {cart.map((item) => {
        return (
          <div className="card" id="cart_id" key={item.id}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{item.rating}</h6>
              <p className="card-text">{item.description}</p>
              <p className="card-text">
                <i className="fas fa-rupee-sign"></i>
                {item.price}
              </p>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteProductFromCart(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// MAP STATE TO PROPS FUNCTION
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

// MAP DISPATCH TO PROPS FUNCTION

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProductFromCart: (id) => dispatch(deleteProductFromCart(id)),
  };
};

// CONNECTING THE STATE AND DISPATCH TO THE COMPOENT
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
