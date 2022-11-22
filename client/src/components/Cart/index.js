import React, { useEffect } from "react";
import { useContext } from "react";
import { Header } from "../Header";
import { useNavigate } from "react-router-dom";
import "./index.css";
import CartContext from "../../context/CartContext";
import CartListView from "../CartListView";
import EmptyCartView from "../EmptyCartView";
import Cookies from "js-cookie";

export function Cart() {
  const contextObj = useContext(CartContext);
  const jwtToken = Cookies.get("jwt_token");
  const { cartList, clearCartItems } = contextObj;

  const history = useNavigate();
  useEffect(() => {
    if (jwtToken === undefined) {
      history("/login");
    }
  }, []);
  const showEmptyView = cartList.length === 0;

  const getCartTotal = () => {
    let total = 0;
    cartList.forEach((element) => {
      total += element.quantity * element.price;
    });
    return total;
  };

  const onClickOrder = async () => {
    const productsIds = cartList.map((eachItem) => eachItem.id);
    const date = new Date();
    const formatedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // console.log(formatedDate);
    // console.log(productsIds);
    const obj = { date: formatedDate, productsIds };
    const url = "/place-order";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "Application/json",
      },
      body: JSON.stringify(obj),
    };
    const response = await fetch(url, options);
    if (response.status === 200) {
      alert("order placed successfully");
      clearCartItems();
    } else {
      alert("server error");
    }
  };

  const renderCartListView = () => {
    const total = getCartTotal();
    return (
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <CartListView />
            <div className="cart-total-container">
              <h1 className="cart-heading">Cart Totals</h1>
              <div className="total-container">
                <h3>Subtotal</h3>
                <p className="total-price">${total}</p>
              </div>
              <div className="total-container">
                <h3>Shipping Fee!!</h3>
                <p>FREE!!</p>
              </div>
              <div className="total-container">
                <h3>Total</h3>
                <p className="total-price">${total}</p>
              </div>
              <button className="order-button" onClick={onClickOrder}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Header />
      {renderCartListView()}
    </div>
  );
}
