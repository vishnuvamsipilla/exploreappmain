import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { Products } from "./components/Products";
import Home from "./components/Home";
import CartContext from "./context/CartContext";
import Cookies from "js-cookie";
import ResetPassword from "./components/ResetPassword";
import { Cart } from "./components/Cart";
import { OrdersHistory } from "./components/OrdersHistory";

import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import ProductDetails from "./components/ProductDetails";
let jwtToken1 = Cookies.get("jwt_token");

const App = () => {
  const [cartList, updateCartList] = useState([]);
  const [jwtToken, updateToken] = useState(jwtToken1);

  const getCartList = async () => {
    const url = "/cart-list";
    const options = {
      method: "get",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const { data } = await response.json();
      console.log(data);
      updateCartList(data);
    }
  };
  useEffect(() => {
    if (jwtToken !== undefined) {
      getCartList();
    }
  }, [jwtToken]);

  const addCartItem = (obj) => {
    updateCartList([...cartList, obj]);
  };

  const removeCartItem = (id) => {
    updateCartList(cartList.filter((eachItem) => eachItem.id !== id));
  };

  const updateCartProductQty = (obj) => {
    const { id, quantity } = obj;
    console.log(id);
    console.log(quantity);

    updateCartList(
      cartList.map((eachItem) => {
        if (eachItem.id === id) {
          return { ...eachItem, quantity: quantity };
        }
        return eachItem;
      })
    );
  };

  const clearCartItems = () => {
    updateCartList([]);
  };

  return (
    <div className="app-container">
      <CartContext.Provider
        value={{
          cartList,
          updateCartList,
          addCartItem,
          removeCartItem,
          updateCartProductQty,
          updateToken,
          clearCartItems,
        }}
      >
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Home />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/products" element={<Products />} />
          <Route
            exact
            path="/products/:productId"
            element={<ProductDetails />}
          />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders-history" element={<OrdersHistory />} />
          <Route
            exact
            path="/forgot-password/:id/:token"
            element={<ForgotPassword />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </div>
  );
};

export default App;
