import React from "react";

const initialState = { cartList: [] };

const CartContext = React.createContext(initialState);

export default CartContext;
