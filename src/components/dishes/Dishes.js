import React from "react";
import { useNavigate } from "react-router-dom";

function Dishes() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-4">
      <h1>Dishes Page</h1>
      <button
        className="btn btn-success my-3"
        onClick={() => navigate("/dishes/add")}
      >
        Add Dish
      </button>
    </div>
  );
}

export default Dishes;
