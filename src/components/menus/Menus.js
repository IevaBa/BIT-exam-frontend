import React from "react";
import { useNavigate } from "react-router-dom";

function Menus() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-4">
      <h1>Menu Page</h1>
      <button
        className="btn btn-success my-3"
        onClick={() => navigate("/menus/add")}
      >
        Add Menu
      </button>
    </div>
  );
}

export default Menus;
