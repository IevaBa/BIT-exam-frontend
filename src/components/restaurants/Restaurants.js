import React from "react";
import { useNavigate } from "react-router-dom";

function Restaurants() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-4">
      <h1>Restaurants Page</h1>
      <button
        className="btn btn-success my-3"
        onClick={() => navigate("/restaurants/add")}
      >
        Add Restaurant
      </button>
    </div>
  );
}

export default Restaurants;
