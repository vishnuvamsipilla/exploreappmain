import React from "react";
import Cookies from "js-cookie";
import { useNavigate, Route } from "react-router-dom";

function ProtectedRoute(props) {
  console.log(props);
  const history = useNavigate();
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return history("/login");
  } else {
    return <Route {...props} />;
  }
}

export default ProtectedRoute;
