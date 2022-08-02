import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signUp() {
    let item = { name, password, email };
    //console.log(item);
    let result = await fetch("http://localhost:8000/api/v1/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    //console.log("result", result);
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/");
  }

  return (
    <div className="login-wrapper w-100 d-flex align-items-center justify-content-center">
      <form className="login-form text-white">
        <div className="form-group">
          <h2 className="mb-4 text-center fw-bold">Register</h2>
          <input
            type="text"
            value={name}
            className="form-control my-4 px-2"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <input
            type="email"
            value={email}
            className="form-control my-4 px-2"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <input
            type="password"
            className="form-control my-4 px-2 mb-3 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button
          onClick={signUp}
          className="submit-btn d-block ms-auto fw-bold text-light text-uppercase fs-6 py-2 px-3 border-0 rounded-3"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
