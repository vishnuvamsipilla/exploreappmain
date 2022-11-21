import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Header } from "../Header";
import Cookies from "js-cookie";
import ProductCard from "../ProductCard";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export function Products() {
  const [apiStatus, updateApiStatus] = useState(apiStatusConstants.initial);
  const [productsList, updateProductsList] = useState([]);
  const jwtToken = Cookies.get("jwt_token");
  const history = useNavigate();
  useEffect(() => {
    if (jwtToken === undefined) {
      history("/login");
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    updateApiStatus(apiStatusConstants.inProgress);
    // const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "/products";
    const options = {
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();

      const updatedData = fetchedData.data.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
      }));
      updateProductsList(updatedData);
      updateApiStatus(apiStatusConstants.success);
    } else {
      updateApiStatus(apiStatusConstants.failure);
    }
  };

  // loading view
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

  // failure view

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

  // products view
  // const productsList1 = productsList.slice(0, 4);

  const renderProductsListView = () => {
    return (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    );
  };

  const renderAllProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsListView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      {renderAllProducts()}
    </div>
  );
}
