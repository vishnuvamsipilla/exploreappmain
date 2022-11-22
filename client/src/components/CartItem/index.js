import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useContext } from "react";
import Cookies from "js-cookie";

import CartContext from "../../context/CartContext";

import "./index.css";

const CartItem = ({ cartItemDetails }) => {
  const { id, title, brand, quantity, price, image_url } = cartItemDetails;
  const contextObj = useContext(CartContext);
  const { removeCartItem, updateCartProductQty } = contextObj;
  const jwtToken = Cookies.get("jwt_token");

  const onIncrementQuantity = async () => {
    const url = "/update-product-quantity";
    const obj = { id, quantity: quantity + 1 };
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
      updateCartProductQty({ id, quantity: quantity + 1 });
    } else {
      alert("server error");
    }
  };
  const onDecrementQuantity = async () => {
    if (quantity > 1) {
      const obj = { id, quantity: quantity - 1 };
      const url = "/update-product-quantity";
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
        updateCartProductQty({ id, quantity: quantity - 1 });
      } else {
        alert("server error");
      }
    }
  };
  const onRemoveCartItem = async () => {
    const url = `/remove-cart-item/${id}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    if (response.status === 200) {
      removeCartItem(id);
    } else {
      alert("server error check your network");
    }
  };

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={image_url} alt={title} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>
        <div className="cart-quantity-container">
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
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {price * quantity}/-</p>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
