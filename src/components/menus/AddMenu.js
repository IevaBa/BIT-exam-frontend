import React from "react";
import { useNavigate } from "react-router-dom";

function AddMenu() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-4">
      <h1>Add Menu</h1>
      <button className="btn btn-secondary my-3" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
}

export default AddMenu;
