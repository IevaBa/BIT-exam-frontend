import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ logedIn, setLogedIn, setAdmin }) => {
  const [token, _] = useState(localStorage.getItem("token"));

  const nav = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("admin");
    setLogedIn(false);
    setAdmin(false);
    return nav("/");
  };
  return (
    <nav className="navbar bg-light border-bottom border-5  p-2 fs-4">
      <div className="nav-header bg-light">
        {token && (
          <ul className="header nav ">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "a nav-link active text-secondary fw-bold"
                    : "a nav-link text-secondary"
                }
                to="/"
              >
                Restaurants
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "a nav-link active text-secondary fw-bold"
                    : "a nav-link text-secondary"
                }
                to="/search"
              >
                Search Restaurant
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "a nav-link active text-secondary fw-bold"
                    : "a nav-link text-secondary"
                }
                to="/menus"
              >
                Menus
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "a nav-link active text-secondary fw-bold"
                    : "a nav-link text-secondary"
                }
                to="/dishes"
              >
                Dishes
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="d-flex px-1">
        <ul className="header nav">
          {/* {!token && ( */}
          <>
            <li
              style={!logedIn ? { display: "block" } : { display: "none" }}
              className="nav-item"
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "a nav-link active text-secondary fw-bold"
                    : "a nav-link text-secondary"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li
              style={!logedIn ? { display: "block" } : { display: "none" }}
              className="nav-item"
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "a nav-link active text-secondary fw-bold"
                    : "a nav-link text-secondary"
                }
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </>
          {/* )} */}
          <li className="text-center d-flex">
            <div
              style={logedIn ? { display: "block" } : { display: "none" }}
              className="me-4 align-items-center justify-content-center text-secondary"
            >
              Welcome, {localStorage.getItem("username")} !
              <button className="btn btn-secondary mx-3" onClick={logout}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
