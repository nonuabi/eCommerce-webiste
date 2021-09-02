// IMPORT ACTION TYPES
import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  DELETE_PRODUCT,
  PRODUCT_INFORMATION,
  ADD_TO_CART,
  DELETE_PROUDUCT_FROM_CART,
  POST_PRODUCT_SUCCESS,
  HANDLE_SORT_BUTTON,
  HANDLE_EDIT_POST,
} from "./postType";
// API URL
const api_url =
  "https://my-json-server.typicode.com/nonuabi/Ecommerce-App-DB/posts";
// REQUEST FETCH ACTION
export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};
// SUCCESSFULL FETCH POST ACTION
export const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};
// FAILURE FETCH POST ACTION
export const fetchPostsFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error,
  };
};

// FETCH POST FORM THE API ACTION WHICH RETURN AN FUNCTION
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest);
    const res = await fetch(api_url);
    const response = await res.json();
    if (response) {
      dispatch(fetchPostsSuccess(response));
    } else {
      alert("server error while fetching data");
      dispatch(fetchPostsFailure("server error"));
    }
  };
};

// DELTE PRODUCT ACTION CREADTER
export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};
// INFORMATION ABOUT PROUDCTION ACTION
export const productInformation = (product_id) => {
  return {
    type: PRODUCT_INFORMATION,
    payload: product_id,
  };
};

// ADD PRODUCT TO THE CART LIST ACTION
export const addToCart = (product_id) => {
  return {
    type: ADD_TO_CART,
    payload: product_id,
  };
};

// DELETE THE PRODUCT ACTIONS
export const deleteProductFromCart = (product_id) => {
  return {
    type: DELETE_PROUDUCT_FROM_CART,
    payload: product_id,
  };
};
// ADD NEW PRODUCT SUCCESSFULL ACTION
export const postProductSuccess = (product) => {
  return {
    type: POST_PRODUCT_SUCCESS,
    payload: product,
  };
};

// ADD NEW DATA TO THE DB API CALL ACTION
export const addProduct = (product) => {
  return async (dispatch) => {
    const res = await fetch(api_url, {
      method: "POST",
      body: JSON.stringify({
        ...product,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    if (data) {
      alert("product is added");
      dispatch(postProductSuccess(data));
    } else {
      alert("server error while posting data to the db");
    }
  };
};

// TO SORT THE PRICE ACTION
export const handleSortButton = () => {
  return {
    type: HANDLE_SORT_BUTTON,
  };
};

// EDIT POST ACTION
export const handleEditPost = (data) => {
  return {
    type: HANDLE_EDIT_POST,
    payload: data,
  };
};
