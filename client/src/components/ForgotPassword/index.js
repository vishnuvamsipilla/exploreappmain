import "./index.css";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [inputDetails, updateInput] = useState({
    password: "",
  });
  const [showPassword, toggleShowPassword] = useState(false);

  const history = useNavigate();
  const { id, token } = useParams();

  const setValue = (e) => {
    const { name, value } = e.target;
    updateInput({ ...inputDetails, [name]: value });
  };

  const { password } = inputDetails;

  const getUserDetailsDb = async () => {
    const url = `/forgotpassword/${id}/${token}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputDetails),
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      alert("Password updated successfully");
      history("/");
    } else {
      alert("Invalid credientials");
    }
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      alert("Please enter password");
    } else if (password.length < 8) {
      alert("password must be 8 chars");
    } else {
      getUserDetailsDb();
    }
  };

  return (
    <div className="register-container">
      <h1>Reset Password</h1>

      <form onSubmit={onClickSubmit} className="form-container">
        <div className="input-container">
          <label htmlFor="password" className="label">
            password
          </label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={setValue}
              value={password}
              id="password"
              className="password-input"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="input submit-button">
          send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
