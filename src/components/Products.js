import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// PRODUCT LIST PAGE CSS
import "../css/ProductsContainer.css";
// IMPORTING ACTIONS
import {
  deleteProduct,
  fetchPosts,
  productInformation,
  addToCart,
  handleSortButton,
  handleEditPost,
} from "../redux/posts/postAction";
// DECONSTRUCTING PROPS
const Products = ({
  fetchPost,
  postData,
  deleteProduct,
  product_Information,
  addToCart,
  sort,
  edit,
}) => {
  // STATE TO  CHECK WHETHER PENCIL BUTTON CLICK OR NOT
  const [inEdit, setInEdit] = useState({
    value: "Type Here..",
    isInEditMode: false,
    id: -1,
  });
  // TO GET INPUT VALUE
  const inputRef = useRef(null);
  // TO LOAD DATA WHEN THE PRODUCT PAGE IS RENDERED
  useEffect(() => {
    fetchPost();
  }, [postData.sort]);
  // HANDLE THE PENCILE BUTTON CLICK
  const changeEditMode = (product_id) => {
    setInEdit({
      ...inEdit,
      isInEditMode: !inEdit.isInEditMode,
      id: product_id,
    });
  };
  // UPDATE THE TITLE WHEN CLICK OVER THE OK BUTTON
  const updateComponentValue = (product_id) => {
    edit({ id: product_id, value: inputRef.current.value });
    if (inputRef.current) {
      setInEdit({
        ...inEdit,
        isInEditMode: !inEdit.isInEditMode,
        value: inputRef.current.value,
      });
    }
  };
  // TO SORT THE PRICE LIST IN ASSENDING ORDER
  const handleSort = () => {
    if (postData.sort) {
      return postData.posts;
    } else {
      let sorted = postData.posts.sort((a, b) => {
        return a.price - b.price;
      });
      return sorted;
    }
  };
  // CHECKING IS API STILL GETING DATA OR NOT
  return postData.loading ? (
    <h2 className="display-1">Loading...</h2>
  ) : postData && postData.error ? (
    // IF ANY ERROR WHILE FETCHING DATA IT WILL DISPLAY
    <h2>{postData.error}</h2>
  ) : (
    <div>
      {/* HEADER OF THE CONTAINER WHILE CONTAINER HEADING AND SORT BUTTON */}
      <div className="product_header">
        <h2>Product List</h2>
        {postData.sort === true ? (
          <button className="btn btn-outline-dark" onClick={sort}>
            Sort
          </button>
        ) : (
          <button className="btn btn-outline-danger" onClick={sort}>
            X
          </button>
        )}
      </div>
      <div className="cart_container">
        {/* CHECK FOR THE FETCHED DATA */}
        {postData &&
          postData.posts &&
          // MAPPING OVER THE DATA
          handleSort().map((post) => {
            return (
              <div className="card" id="cart_id" key={post.id}>
                <div className="card-body">
                  {/* CHECKING IS PENCIL BUTTON IS CLICKED OR NOT */}
                  {inEdit.isInEditMode && inEdit.id === post.id ? (
                    <div
                      id="edit_input_container"
                      className="input-group flex-nowrap"
                    >
                      {/* EDIT INPUT TAG */}
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={post.title}
                        ref={inputRef}
                      />
                      {/* BUTTON TO IGONRE THE ENTER VALUE BY THE USER */}
                      <button
                        id="edit_btn"
                        className="btn btn-danger"
                        onClick={changeEditMode}
                      >
                        X
                      </button>
                      {/* BUTTON TO UPDATE THE TITLE */}
                      <button
                        id="edit_btn"
                        className="btn btn-success"
                        onClick={() => updateComponentValue(post.id)}
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <div className="header_container">
                      {/* PRODUCT TITLE */}
                      <h5 className="card-title">{post.title}</h5>
                      {/* PRODUCT INFORMATION BUTTON */}
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => changeEditMode(post.id)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </div>
                  )}
                  {/* PRODUCT RATING  */}
                  <h6 className="card-subtitle mb-2 text-muted">
                    {post.rating}
                  </h6>
                  {/* PRODUCT INFORMATION */}
                  <p className="card-text">{post.description}</p>
                  {/* PRODUCT PRICE */}
                  <p className="card-text">
                    <i className="fas fa-rupee-sign"></i>
                    {post.price}
                  </p>
                  <div className="button_container">
                    {/* ADD TO CART PAGE BUTTON */}
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => addToCart(post.id)}
                    >
                      Add To Cart
                    </button>
                    {/* DELETE PRODUCT BUTTON */}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteProduct(post.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    {/* REDIRECT TO INFORMATION ABOUT THE PRODUCT PAGE LINK */}
                    <Link
                      className="btn btn-outline-info"
                      to="productInformation"
                      onClick={() => product_Information(post.id)}
                    >
                      Info
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        {/* ITERATING OVER THE NEWLY ADDED PRODUCTS  */}
        {postData.new_products.length > 0
          ? postData.new_products.map((post) => {
              return (
                <div className="card" id="cart_id" key={post.id}>
                  <div className="card-body">
                    {inEdit.isInEditMode && inEdit.id === post.id ? (
                      <div
                        id="edit_input_container"
                        className="input-group flex-nowrap"
                      >
                        <input
                          className="form-control"
                          type="text"
                          defaultValue={post.title}
                          ref={inputRef}
                        />
                        <button
                          id="edit_btn"
                          className="btn btn-danger"
                          onClick={changeEditMode}
                        >
                          X
                        </button>
                        <button
                          id="edit_btn"
                          className="btn btn-success"
                          onClick={() => updateComponentValue(post.id)}
                        >
                          OK
                        </button>
                      </div>
                    ) : (
                      <div className="header_container">
                        <h5 className="card-title">{post.title}</h5>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => changeEditMode(post.id)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                      </div>
                    )}
                    <h6 className="card-subtitle mb-2 text-muted">
                      {post.rating}
                    </h6>
                    <p className="card-text">{post.description}</p>
                    <p className="card-text">
                      <i className="fas fa-rupee-sign"></i>
                      {post.price}
                    </p>
                    <div className="button_container">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => addToCart(post.id)}
                      >
                        Add To Cart
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => deleteProduct(post.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>

                      <Link
                        className="btn btn-outline-info"
                        to="productInformation"
                        onClick={() => product_Information(post.id)}
                      >
                        Info
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

// MAP TO STATE FUNCTION

const mapStateToProps = (state) => {
  return {
    postData: state,
  };
};

// MAP TO DISPATCH FUNCTION
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: () => dispatch(fetchPosts()),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    product_Information: (id) => dispatch(productInformation(id)),
    addToCart: (id) => dispatch(addToCart(id)),
    sort: () => dispatch(handleSortButton()),
    edit: (data) => dispatch(handleEditPost(data)),
  };
};
// CONNECTING STATE AND DISPATCH TO THE COMPONENT
export default connect(mapStateToProps, mapDispatchToProps)(Products);
