import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

async function loginUser(credentials) {
  return fetch("http://localhost:8000/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login(setLogedIn) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // Login priklauso nuo tokeno
  useEffect(() => {
    if (token) return navigate("/");
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginInfo = await loginUser({ email, password });
    setToken(loginInfo["authorisation"]["token"]);
    localStorage.setItem("token", loginInfo["authorisation"]["token"]);
    localStorage.setItem("username", loginInfo["user"]["name"]);
    localStorage.setItem("admin", loginInfo["user"]["admin"]);
    setLogedIn(true);
    window.location.reload();
  };
  return (
    <div className="login-wrapper w-100 d-flex align-items-center justify-content-center">
      <form className="login-form text-white" onSubmit={handleSubmit}>
        <div className="form-group">
          <h2 className="mb-4 text-center fw-bold">Login</h2>
          <input
            type="email"
            className="form-control mt-2 px-2"
            id="exampleInputEmail1"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mt-4">
          <input
            type="password"
            className="form-control mt-2 px-2 mb-2"
            id="pass"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <br />
        <button
          type="submit"
          className="submit-btn d-block ms-auto fw-bold text-light text-uppercase fs-6 py-2 px-3 border-0 rounded-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
