import React from "react";
import "./index.css";

function HistoryItem({ details }) {
  const { title, brand, price, image_url, dateTime } = details;
  return (
    <li className="cart-item">
      <img className="cart-product-image" src={image_url} alt={title} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>

        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {price}/-</p>
        </div>
        <h3>
          Ordered on <span className="order-date">{dateTime}</span>
        </h3>
      </div>
    </li>
  );
}

export default HistoryItem;
