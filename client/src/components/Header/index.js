import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import "./index.css";
import Cookies from "js-cookie";
import CartContext from "../../context/CartContext";
import { useContext } from "react";

export function Header() {
  const contextObj = useContext(CartContext);
  const { cartList } = contextObj;
  const cartQuantity = cartList.length;
  const showCartCount = cartQuantity > 0;
  const history = useNavigate();
  const onClickSignOut = () => {
    Cookies.remove("jwt_token");
    history("/login");
  };

  const onClickHistory = () => {
    history("/orders-history");
  };

  return (
    <div className="header-container">
      <h1 className="brand1">ECloths</h1>
      <div className="tabs-container">
        <NavLink to="/" className="nav-link ">
          <h1 className="tab">Home</h1>
        </NavLink>
        <NavLink to="/products" className="nav-link ">
          <h1 className="tab">Products</h1>
        </NavLink>
        <h1 className="tab">About</h1>
        <h1 className="tab">Contact Us</h1>
      </div>
      <div className="cart-history-container">
        <NavLink to="/cart">
          <BsFillCartPlusFill className="cart-icon" />
        </NavLink>
        {showCartCount && (
          <div className="cart-quantity-container1">
            <p>{cartQuantity}</p>
          </div>
        )}
        <button className="history-btn" onClick={onClickHistory}>
          Order History
        </button>
        <button className="logout-btn" onClick={onClickSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
