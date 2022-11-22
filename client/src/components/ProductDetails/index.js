import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import CartContext from "../../context/CartContext";

import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

// import CartContext from "../../context/CartContext";

import { Header } from "../Header";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProductDetails = () => {
  const [productData, updateProductData] = useState({});
  const [apiStatus, updateApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, updateQuantity] = useState(1);
  const { productId } = useParams();
  const contextObj = useContext(CartContext);
  const { addCartItem, cartList, updateCartProductQty } = contextObj;
  console.log(cartList);
  const jwtToken = Cookies.get("jwt_token");
  const history = useNavigate();
  useEffect(() => {
    if (jwtToken === undefined) {
      history("/login");
    }
  }, []);

  useEffect(() => {
    getProductData();
  }, []);

  const getFormattedData = (data) => ({
    brand: data.brand,

    id: data.id,
    image_url: data.image_url,
    price: data.price,

    title: data.title,
  });
  const { brand, id, image_url, price, title } = productData;

  const onIncrementQuantity1 = async () => {
    //   const itemDetails = cartList.find((eachItem) => (eachItem.id = id));
    //  const oldQuantity = itemDetails.quantity;
    //   const obj = { id, quantity: quantity + oldQuantity };
    // updateCartProductQty(obj);
    const url = "/update-product-quantity";
    const itemDetails = cartList.find((eachItem) => eachItem.id === id);

    const oldQuantity = itemDetails.quantity;
    console.log(oldQuantity);

    const obj = { id, quantity: quantity + oldQuantity };

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Item added to the cart");
      console.log();
      updateCartProductQty(obj);
    } else {
      alert("server error");
    }
  };

  const getProductData = async () => {
    updateApiStatus(apiStatusConstants.inProgress);

    console.log(jwtToken);
    const apiUrl = `/products/${productId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = getFormattedData(fetchedData.data);
      updateApiStatus(apiStatusConstants.success);
      updateProductData(updatedData);
    }
    if (response.status === 404) {
      updateApiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  // const cartObject = { productId: id, quantity };

  const onClickAddToCart = async () => {
    const isProductIncart = cartList.find((eachItem) => eachItem.id === id);
    // console.log(cartList);
    // console.log(isProductIncart);

    const newObj = { id, quantity };
    if (isProductIncart === undefined) {
      console.log("pilla");
      const url = "/addcartitem";
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      };
      const response = await fetch(url, options);
      if (response.status === 200) {
        alert("Item added to the cart");
        addCartItem({ ...productData, quantity });
      } else {
        alert("server error check your network");
      }
    } else {
      onIncrementQuantity1();
    }
  };

  const onIncrementQuantity = () => {
    updateQuantity(quantity + 1);
  };

  const renderProductDetailsView = () => (
    <div className="product-details-success-view">
      <div className="product-details-container">
        <img src={image_url} alt="product" className="product-image" />
        <div className="product">
          <h1 className="product-name">{title}</h1>
          <p className="price-details">Rs {price}/-</p>

          <div className="label-value-container">
            <p className="label">Available:</p>
            <p className="value">In stock</p>
          </div>
          <div className="label-value-container">
            <p className="label">Brand:</p>
            <p className="value">{brand}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onDecrementQuantity}
            >
              <BsDashSquare className="quantity-controller-icon" />
            </button>
            <p className="quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onIncrementQuantity}
            >
              <BsPlusSquare className="quantity-controller-icon" />
            </button>
          </div>
          <button
            type="button"
            className="button add-to-cart-btn"
            onClick={onClickAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };
  return (
    <div className="products-container">
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </div>
  );
};

export default ProductDetails;
