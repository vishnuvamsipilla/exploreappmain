import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

import "./index.css";
import { Header } from "../Header";

function Home() {
  const jwtToken = Cookies.get("jwt_token");
  const history = useNavigate();
  useEffect(() => {
    if (jwtToken === undefined) {
      history("/login");
    }
  }, []);
  return (
    <div className="home-container">
      <Header />
      <div className="home-section">
        <button className="shop-btn" onClick={() => history("/products")}>
          shop now
        </button>
      </div>
    </div>
  );
}

export default Home;
